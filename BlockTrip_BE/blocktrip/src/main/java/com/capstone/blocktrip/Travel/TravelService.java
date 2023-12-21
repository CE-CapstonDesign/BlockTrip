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
import java.util.Arrays;
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

        CompletableFuture<String> restaurantFuture = chatGPTService.callGPT3Async(restaurantPrompt);
        CompletableFuture<String> placeFuture = chatGPTService.callGPT3Async(placePrompt);

        CompletableFuture.allOf(restaurantFuture, placeFuture).join();

        String restaurantResponse = restaurantFuture.join();
        String placeResponse = placeFuture.join();

        return combineResponses(restaurantResponse, placeResponse);
    }

    private long calculateDaysBetween(String startDate, String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);
        return ChronoUnit.DAYS.between(start, end);
    }

    private String createRestaurantPrompt(TravelRequest request) {
        TravelRequest.CommonRequest common = request.getCommon();
        TravelRequest.RestaurantRequest restaurant = request.getRestaurant();
        String foodTypes = String.join(", ", restaurant.getFoodType());
        String restaurantTypes = String.join(", ", restaurant.getRestaurantType());

        long days = calculateDaysBetween(common.getDepartureDate(), common.getArrivalDate());
        int numberOfPlaces = (int) (20 * days);

        return String.format(
                "destination: %s, depart Date: %s, arrive date: %s\n" +
                        "region: %s food type %s please recommend restaurant topic %s .\n" +
                        "Please present up to %s actual restaurants in english in a list format. Please provide only the name of each restaurant, please never never use newlines or dot, and list them separated by only commas (, ) as shown in the example. (Examples: Gwangju Prison History Museum, Asia Culture Center, Chonnam National University, Gwangju Red Clay Road)",
                common.getDestinationLocation(),
                common.getDepartureDate(),
                common.getArrivalDate(),
                common.getDestinationLocation(),
                foodTypes,
                restaurantTypes,
                numberOfPlaces
        );
    }

    private String createPlacePrompt(TravelRequest request) {
        TravelRequest.CommonRequest common = request.getCommon();
        TravelRequest.PlaceRequest place = request.getPlace();
        String interests = String.join(", ", place.getInterests());
        String travelStyles = String.join(", ", place.getTravelStyle());

        long days = calculateDaysBetween(common.getDepartureDate(), common.getArrivalDate());
        int numberOfPlaces = (int) (20 * days);

        return String.format(
                "destination: %s, depart Date: %s, arrive date: %s\n" +
                        "region: %s my style: %s style. my interest: %s  please recommend attractions.\n" +
                        "Please present up to %s tourist attractions in english in a list format. Please provide only the name of each tourist attraction, please never never use newlines or dot, and list them separated only by commas (, ) as shown in the example. (Ex: sushi, udon, yakitori, hambuger)",
                common.getDestinationLocation(),
                common.getDepartureDate(),
                common.getArrivalDate(),
                common.getDestinationLocation(),
                travelStyles,
                interests,
                numberOfPlaces
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
            JsonNode choices = rootNode.path("choices");
            if (!choices.isMissingNode() && choices.isArray()) {
                for (JsonNode choice : choices) {
                    JsonNode messageNode = choice.path("message");
                    if (!messageNode.isMissingNode()) {
                        String content = messageNode.path("content").asText();
                        content = content.replaceAll("\n", ",");
                        content = content.replaceAll("\\d+\\.\\s*", "");
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
