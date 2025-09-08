package com.linkedincontent.contentgenerator.repository;

import com.linkedincontent.contentgenerator.model.Post;
import com.linkedincontent.contentgenerator.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserOrderByCreatedAtDesc(User user);

    List<Post> findByUserIdOrderByCreatedAtDesc(Long userId);
}
