package com.linkedincontent.contentgenerator.dto;

import jakarta.validation.constraints.NotBlank;

public class SavePostRequest {
    @NotBlank(message = "Topic is required")
    private String topic;

    @NotBlank(message = "Tone is required")
    private String tone;

    @NotBlank(message = "Content is required")
    private String content;

    // Constructors
    public SavePostRequest() {
    }

    public SavePostRequest(String topic, String tone, String content) {
        this.topic = topic;
        this.tone = tone;
        this.content = content;
    }

    // Getters and Setters
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
