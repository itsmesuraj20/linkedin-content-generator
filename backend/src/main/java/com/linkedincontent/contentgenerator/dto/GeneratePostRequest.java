package com.linkedincontent.contentgenerator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class GeneratePostRequest {
    @NotBlank(message = "Topic is required")
    private String topic;

    @NotBlank(message = "Tone is required")
    @Pattern(regexp = "professional|casual|storytelling", 
             message = "Tone must be one of: professional, casual, storytelling")
    private String tone;

    // Constructors
    public GeneratePostRequest() {}

    public GeneratePostRequest(String topic, String tone) {
        this.topic = topic;
        this.tone = tone;
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
}
