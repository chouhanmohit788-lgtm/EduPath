package com.edupath.service;

import com.google.genai.Client;
import com.google.genai.ResponseStream;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private final Client client;

    private static final String MODEL = "gemini-3.6-flash";

    public GeminiService() {
        this.client = new Client();
    }

    public String generateResponse(String prompt) {

        if (prompt == null || prompt.isBlank()) {
            throw new RuntimeException("Prompt cannot be empty.");
        }

        GenerateContentResponse response =
                client.models.generateContent(
                        MODEL,
                        prompt,
                        null
                );

        String text = response.text();

        if (text == null || text.isBlank()) {
            throw new RuntimeException(
                    "Gemini returned an empty response."
            );
        }

        return text;
    }

    public ResponseStream<GenerateContentResponse> generateResponseStream(
            String prompt) {

        if (prompt == null || prompt.isBlank()) {
            throw new RuntimeException(
                    "Prompt cannot be empty."
            );
        }

        return client.models.generateContentStream(
                MODEL,
                prompt,
                null
        );
    }
}