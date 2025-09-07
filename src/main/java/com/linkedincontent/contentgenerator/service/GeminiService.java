package com.linkedincontent.contentgenerator.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<String> generatePosts(String topic, String tone) {
        try {
            String prompt = buildPrompt(topic, tone);
            String requestBody = buildRequestBody(prompt);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            String url = apiUrl + "?key=" + apiKey;
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            
            return parseResponse(response.getBody());
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate content from Gemini API: " + e.getMessage());
        }
    }

    private String buildPrompt(String topic, String tone) {
        return String.format(
            "Write 3 LinkedIn-style posts about %s in %s tone. " +
            "Each post should: " +
            "- Be between 100–200 words. " +
            "- Start with a strong hook. " +
            "- End with a CTA (Call to Action). " +
            "- Be formatted for LinkedIn readability (short paragraphs, line breaks). " +
            "- Include relevant emojis where appropriate. " +
            "Please separate each post with '---POST SEPARATOR---' and number them as Post 1:, Post 2:, Post 3:",
            topic, tone
        );
    }

    private String buildRequestBody(String prompt) throws Exception {
        Map<String, Object> requestMap = new HashMap<>();
        
        List<Map<String, Object>> contents = new ArrayList<>();
        Map<String, Object> content = new HashMap<>();
        
        List<Map<String, String>> parts = new ArrayList<>();
        Map<String, String> part = new HashMap<>();
        part.put("text", prompt);
        parts.add(part);
        
        content.put("parts", parts);
        contents.add(content);
        
        requestMap.put("contents", contents);
        
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("topK", 40);
        generationConfig.put("topP", 0.95);
        generationConfig.put("maxOutputTokens", 2048);
        
        requestMap.put("generationConfig", generationConfig);
        
        return objectMapper.writeValueAsString(requestMap);
    }

    private List<String> parseResponse(String responseBody) throws Exception {
        JsonNode root = objectMapper.readTree(responseBody);
        
        if (root.has("candidates") && root.get("candidates").isArray() && root.get("candidates").size() > 0) {
            JsonNode candidate = root.get("candidates").get(0);
            if (candidate.has("content") && candidate.get("content").has("parts")) {
                JsonNode parts = candidate.get("content").get("parts");
                if (parts.isArray() && parts.size() > 0) {
                    String generatedText = parts.get(0).get("text").asText();
                    return extractPosts(generatedText);
                }
            }
        }
        
        throw new RuntimeException("Unable to parse response from Gemini API");
    }

    private List<String> extractPosts(String generatedText) {
        List<String> posts = new ArrayList<>();
        
        // Split by post separator
        String[] parts = generatedText.split("---POST SEPARATOR---");
        
        for (String part : parts) {
            String cleanedPost = part.trim();
            if (!cleanedPost.isEmpty()) {
                // Remove "Post 1:", "Post 2:", etc. prefixes
                cleanedPost = cleanedPost.replaceFirst("^Post \\d+:\\s*", "");
                if (!cleanedPost.isEmpty()) {
                    posts.add(cleanedPost.trim());
                }
            }
        }
        
        // If separator method didn't work, try to split by "Post X:" pattern
        if (posts.size() < 3) {
            posts.clear();
            String[] postParts = generatedText.split("Post \\d+:");
            
            for (int i = 1; i < postParts.length; i++) { // Start from 1 to skip empty first element
                String post = postParts[i].trim();
                if (!post.isEmpty()) {
                    posts.add(post);
                }
            }
        }
        
        // Ensure we have exactly 3 posts
        while (posts.size() < 3) {
            posts.add("Generated post content placeholder. Please try regenerating.");
        }
        
        // Limit to 3 posts
        if (posts.size() > 3) {
            posts = posts.subList(0, 3);
        }
        
        return posts;
    }
}
