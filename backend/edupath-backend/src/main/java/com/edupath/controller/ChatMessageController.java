package com.edupath.controller;

import com.edupath.entity.ChatMessage;
import com.edupath.service.ChatMessageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/chat")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    public ChatMessageController(
            ChatMessageService chatMessageService) {

        this.chatMessageService =
                chatMessageService;
    }

    @PostMapping
    public ResponseEntity<ChatMessage> createMessage(
            @RequestBody ChatMessage message) {

        return ResponseEntity.ok(
                chatMessageService.createMessage(message)
        );
    }

    @PostMapping(
            value = "/stream",
            produces = MediaType.TEXT_EVENT_STREAM_VALUE
    )
    public SseEmitter streamMessage(
            @RequestBody ChatMessage message) {

        SseEmitter emitter =
                new SseEmitter(120000L);

        new Thread(() ->
                chatMessageService.streamMessage(
                        message,
                        emitter
                )
        ).start();

        return emitter;
    }

    @GetMapping("/{learnerProfileId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(
            @PathVariable UUID learnerProfileId) {

        return ResponseEntity.ok(
                chatMessageService.getChatHistory(
                        learnerProfileId
                )
        );
    }
}