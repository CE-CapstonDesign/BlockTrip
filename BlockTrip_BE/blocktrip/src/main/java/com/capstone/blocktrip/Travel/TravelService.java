package com.capstone.blocktrip.Travel;

import com.capstone.blocktrip.ChatGPT.ChatGPTService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class TravelService {
    private final ChatGPTService chatGPTService;

    @Autowired
    public TravelService(ChatGPTService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }

    public TravelResponse generatePlan(TravelRequest request) {
        String restaurantPrompt = createRestaurantPrompt(request);
        String placePrompt = createPlacePrompt(request);
        int numberOfItems = calculateNumberOfItems(request);

        CompletableFuture<String> restaurantFuture = chatGPTService.callGPT3Async(restaurantPrompt);
        CompletableFuture<String> placeFuture = chatGPTService.callGPT3Async(placePrompt);

        CompletableFuture.allOf(restaurantFuture, placeFuture).join();

        String restaurantResponse = restaurantFuture.join();
        String placeResponse = placeFuture.join();

        return combineResponses(restaurantResponse, placeResponse);
    }

    private int calculateNumberOfItems(TravelRequest request) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start = LocalDate.parse(request.getCommon().getDepartureDate(), formatter);
        LocalDate end = LocalDate.parse(request.getCommon().getArrivalDate(), formatter);
        long days = ChronoUnit.DAYS.between(start, end);
        return (int) (20 * days);
    }

    private String createRestaurantPrompt(TravelRequest request) {
        TravelRequest.CommonRequest common = request.getCommon();
        TravelRequest.RestaurantRequest restaurant = request.getRestaurant();
        String foodTypes = String.join(", ", restaurant.getFoodType());
        String restaurantTypes = String.join(", ", restaurant.getRestaurantType());
        int numberOfItems = calculateNumberOfItems(request);

        return String.format(
                "List %s restaurant names in the %s corresponding to %s, and %s. The response must be exactly 50 restaurant names, separated by commas, and should not include any other details like numbering.",
                numberOfItems,
                common.getDestinationLocation(),
                foodTypes,
                restaurantTypes
        );
    }

    private String createPlacePrompt(TravelRequest request) {
        TravelRequest.CommonRequest common = request.getCommon();
        TravelRequest.PlaceRequest place = request.getPlace();
        String interests = String.join(", ", place.getInterests());
        String travelStyles = String.join(", ", place.getTravelStyle());
        int numberOfItems = calculateNumberOfItems(request);

        return String.format(
                "List exactly %s tourist attraction names in %s that match the interests of %s and the travel styles of %s. The response must be exactly 50 names, separated only by commas, and should not include any other details.",
                numberOfItems,
                common.getDestinationLocation(),
                interests,
                travelStyles
        );
    }

    private TravelResponse combineResponses(String restaurantResponse, String placeResponse) {
        TravelResponse response = new TravelResponse();
        response.setRecommendedRestaurants(parseResponse(restaurantResponse));
        response.setRecommendedPlaces(parseResponse(placeResponse));
        System.out.println("디버깅 getRecommendedPlaces: " + response.getRecommendedPlaces());
        System.out.println("디버깅 getRecommendedRestaurants: " + response.getRecommendedRestaurants());
        return response;
    }

    private List<String> parseResponse(String response) {
        List<String> results = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode choicesNode = rootNode.path("choices");
            if (!choicesNode.isMissingNode() && choicesNode.isArray()) {
                for (JsonNode choiceNode : choicesNode) {
                    String content = choiceNode.path("message").path("content").asText();
                    if (!content.isEmpty()) {
                        String[] items = content.split(",");
                        for (String item : items) {
                            results.add(item.trim());
                        }
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return results;
    }
}
