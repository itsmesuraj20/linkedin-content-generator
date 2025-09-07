package com.linkedincontent.contentgenerator.service;

import com.linkedincontent.contentgenerator.dto.GeneratePostRequest;
import com.linkedincontent.contentgenerator.dto.GeneratePostResponse;
import com.linkedincontent.contentgenerator.dto.SavePostRequest;
import com.linkedincontent.contentgenerator.model.Post;
import com.linkedincontent.contentgenerator.model.User;
import com.linkedincontent.contentgenerator.repository.PostRepository;
import com.linkedincontent.contentgenerator.repository.UserRepository;
import com.linkedincontent.contentgenerator.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GeminiService geminiService;

    public GeneratePostResponse generatePosts(GeneratePostRequest request) {
        List<String> generatedPosts = geminiService.generatePosts(request.getTopic(), request.getTone());
        return new GeneratePostResponse(generatedPosts, request.getTopic(), request.getTone());
    }

    public Post savePost(SavePostRequest request) {
        User currentUser = getCurrentUser();
        
        Post post = new Post();
        post.setUser(currentUser);
        post.setTopic(request.getTopic());
        post.setTone(request.getTone());
        post.setContent(request.getContent());
        
        return postRepository.save(post);
    }

    public List<Post> getUserPosts() {
        User currentUser = getCurrentUser();
        return postRepository.findByUserOrderByCreatedAtDesc(currentUser);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userPrincipal.getUser();
    }
}
