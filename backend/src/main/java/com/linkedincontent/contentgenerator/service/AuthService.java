package com.linkedincontent.contentgenerator.service;

import com.linkedincontent.contentgenerator.dto.AuthResponse;
import com.linkedincontent.contentgenerator.dto.LoginRequest;
import com.linkedincontent.contentgenerator.dto.RegisterRequest;
import com.linkedincontent.contentgenerator.model.User;
import com.linkedincontent.contentgenerator.repository.UserRepository;
import com.linkedincontent.contentgenerator.security.UserPrincipal;
import com.linkedincontent.contentgenerator.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        // Generate JWT token
        UserPrincipal userPrincipal = new UserPrincipal(savedUser);
        String token = jwtUtil.generateToken(userPrincipal);

        return new AuthResponse(token, savedUser.getId(), savedUser.getName(), savedUser.getEmail());
    }

    public AuthResponse login(LoginRequest request) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userPrincipal.getUser();

        // Generate JWT token
        String token = jwtUtil.generateToken(userPrincipal);

        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail());
    }
}
