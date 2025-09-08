package com.linkedincontent.contentgenerator.dto;

import java.util.List;

public class GeneratePostResponse {
    private List<String> posts;
    private String topic;
    private String tone;

    public GeneratePostResponse() {
    }

    public GeneratePostResponse(List<String> posts, String topic, String tone) {
        this.posts = posts;
        this.topic = topic;
        this.tone = tone;
    }

    // Getters and Setters
    public List<String> getPosts() {
        return posts;
    }

    public void setPosts(List<String> posts) {
        this.posts = posts;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }
}
