package com.edupath.service;

import com.edupath.entity.ChatMessage;
import com.edupath.repository.ChatMessageRepository;
import com.google.genai.ResponseStream;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final GeminiService geminiService;

    public ChatMessageService(
            ChatMessageRepository chatMessageRepository,
            GeminiService geminiService) {

        this.chatMessageRepository = chatMessageRepository;
        this.geminiService = geminiService;
    }

    public ChatMessage createMessage(ChatMessage message) {

        if (message == null) {
            throw new RuntimeException("Chat message cannot be null.");
        }

        if (message.getMessage() == null
                || message.getMessage().isBlank()) {
            throw new RuntimeException("Message cannot be empty.");
        }

        if (message.getLearnerProfile() == null
                || message.getLearnerProfile().getId() == null) {
            throw new RuntimeException("Learner profile is required.");
        }

        message.setSender("USER");

        ChatMessage userMessage =
                chatMessageRepository.save(message);

        String prompt = buildPrompt(
                userMessage.getMessage()
        );

        String aiResponse =
                geminiService.generateResponse(prompt);

        ChatMessage assistantMessage =
                new ChatMessage();

        assistantMessage.setLearnerProfile(
                userMessage.getLearnerProfile()
        );

        assistantMessage.setSender("AI");

        assistantMessage.setMessage(aiResponse);

        return chatMessageRepository.save(
                assistantMessage
        );
    }

    public void streamMessage(
            ChatMessage message,
            SseEmitter emitter) {

        try {

            if (message == null) {
                throw new RuntimeException(
                        "Chat message cannot be null."
                );
            }

            if (message.getMessage() == null
                    || message.getMessage().isBlank()) {
                throw new RuntimeException(
                        "Message cannot be empty."
                );
            }

            if (message.getLearnerProfile() == null
                    || message.getLearnerProfile().getId() == null) {
                throw new RuntimeException(
                        "Learner profile is required."
                );
            }

            // Save user message
            message.setSender("USER");

            ChatMessage userMessage =
                    chatMessageRepository.save(message);

            String prompt = buildPrompt(
                    userMessage.getMessage()
            );

            StringBuilder fullResponse =
                    new StringBuilder();

            try (ResponseStream<GenerateContentResponse> stream =
                         geminiService.generateResponseStream(prompt)) {

                for (GenerateContentResponse response : stream) {

                    String text = response.text();

                    if (text == null || text.isBlank()) {
                        continue;
                    }

                    fullResponse.append(text);

                    emitter.send(
                            SseEmitter.event()
                                    .name("message")
                                    .data(text)
                    );
                }
            }

            // Save complete AI response
            ChatMessage assistantMessage =
                    new ChatMessage();

            assistantMessage.setLearnerProfile(
                    userMessage.getLearnerProfile()
            );

            assistantMessage.setSender("AI");

            assistantMessage.setMessage(
                    fullResponse.toString()
            );

            chatMessageRepository.save(
                    assistantMessage
            );

            emitter.send(
                    SseEmitter.event()
                            .name("done")
                            .data("DONE")
            );

            emitter.complete();

        } catch (Exception e) {

            try {
                emitter.send(
                        SseEmitter.event()
                                .name("error")
                                .data(
                                        e.getMessage() != null
                                                ? e.getMessage()
                                                : "AI response failed."
                                )
                );
            } catch (IOException ignored) {
            }

            emitter.completeWithError(e);
        }
    }

    private String buildPrompt(String userMessage) {

        return """
                You are EduPath AI, a learning assistant.

                Help the student with:
                Java, DSA, SQL, OOP, Problem Solving,
                placement preparation and learning roadmaps.

                Give simple and practical answers.
                For coding questions, explain the logic clearly
                and then provide code when useful.

                Student question:
                %s
                """.formatted(userMessage);
    }

    public List<ChatMessage> getChatHistory(
            UUID learnerProfileId) {

        return chatMessageRepository
                .findByLearnerProfileIdOrderByCreatedAtAsc(
                        learnerProfileId
                );
    }
}