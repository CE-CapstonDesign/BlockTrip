package com.capstone.blocktrip.ChatGPT;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
public class ChatGPTService {
    private static final Logger logger = LoggerFactory.getLogger(ChatGPTService.class);

    @Value("${gpt3.api.endpoint}")
    private String gpt3ApiEndpoint;

    @Value("${gpt3.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public ChatGPTService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com").build();
    }

    public CompletableFuture<String> callGPT3Async(String prompt) {
        logger.info("Asynchronous GPT-3 call with prompt: {}", prompt);
        return callGPT3Internal(prompt, true).toFuture();
    }

    public String callGPT3(String prompt) {
        logger.info("Synchronous GPT-3 call with prompt: {}", prompt);
        return callGPT3Internal(prompt, false).block();
    }

    private Mono<String> callGPT3Internal(String prompt, boolean async) {
        return webClient.post()
                .uri("https://api.openai.com/v1/engines/text-davinci-003/completions")
                .headers(headers -> headers.setBearerAuth(apiKey))
                .bodyValue(Map.of(
                        "prompt", prompt,
                        "max_tokens", 150,
                        "temperature", 0.8
                ))
                .retrieve()
                .bodyToMono(String.class);
    }
}
