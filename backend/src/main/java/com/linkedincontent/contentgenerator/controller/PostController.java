package com.linkedincontent.contentgenerator.controller;

import com.linkedincontent.contentgenerator.dto.GeneratePostRequest;
import com.linkedincontent.contentgenerator.dto.GeneratePostResponse;
import com.linkedincontent.contentgenerator.dto.SavePostRequest;
import com.linkedincontent.contentgenerator.model.Post;
import com.linkedincontent.contentgenerator.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/generate-post")
    public ResponseEntity<?> generatePost(@Valid @RequestBody GeneratePostRequest request) {
        try {
            GeneratePostResponse response = postService.generatePosts(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to generate posts: " + e.getMessage());
        }
    }

    @PostMapping("/test-generate")
    public ResponseEntity<?> testGenerate(@Valid @RequestBody GeneratePostRequest request) {
        try {
            // Simple test response without calling Gemini API
            GeneratePostResponse response = new GeneratePostResponse();
            response.setPosts(java.util.Arrays.asList(
                    "Test post 1 for topic: " + request.getTopic() + " with tone: " + request.getTone(),
                    "Test post 2 for topic: " + request.getTopic() + " with tone: " + request.getTone(),
                    "Test post 3 for topic: " + request.getTopic() + " with tone: " + request.getTone()));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to generate test posts: " + e.getMessage());
        }
    }

    @PostMapping("/posts/save")
    public ResponseEntity<?> savePost(@Valid @RequestBody SavePostRequest request) {
        try {
            Post savedPost = postService.savePost(request);
            return ResponseEntity.ok(savedPost);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to save post: " + e.getMessage());
        }
    }

    @GetMapping("/posts/history")
    public ResponseEntity<?> getPostHistory() {
        try {
            List<Post> posts = postService.getUserPosts();
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to retrieve posts: " + e.getMessage());
        }
    }
}
