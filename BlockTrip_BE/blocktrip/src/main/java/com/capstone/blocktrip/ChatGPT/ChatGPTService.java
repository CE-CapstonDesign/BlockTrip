package com.capstone.blocktrip.ChatGPT;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;


@Service
public class ChatGPTService {
    @Value("${gpt3.api.endpoint}")
    private String gpt3ApiEndpoint;

    @Value("${gpt3.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public ChatGPTService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(gpt3ApiEndpoint).build();
    }

    public String callGPT3(String prompt) {
        Mono<String> responseMono = webClient.post()
                .uri(uriBuilder -> uriBuilder.path("/v1/engines/davinci-002/completions").build())
                .headers(headers -> headers.setBearerAuth(apiKey))
                .bodyValue(Map.of("prompt", prompt, "max_tokens", 150))
                .retrieve()
                .bodyToMono(String.class);

        // Block the webclient call to make it synchronous
        return responseMono.block();
    }


}
