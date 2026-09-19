package com.edupath.repository;

import com.edupath.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {

    List<ChatMessage> findByLearnerProfileIdOrderByCreatedAtAsc(
            UUID learnerProfileId
    );
}