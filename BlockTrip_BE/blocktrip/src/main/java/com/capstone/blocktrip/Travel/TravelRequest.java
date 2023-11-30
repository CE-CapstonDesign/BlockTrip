package com.capstone.blocktrip.Travel;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

public class TravelRequest {

    @Getter
    @Setter
    private CommonRequest common;

    @Getter
    @Setter
    private RestaurantRequest restaurant;

    @Getter
    @Setter
    private PlaceRequest place;

    @Getter
    @Setter
    @ToString
    public static class CommonRequest {
        private String departureLocation;
        private String destinationLocation;
        private String departureDate;
        private String arrivalDate;
    }

    @Getter
    @Setter
    @ToString
    public static class RestaurantRequest {
        private List<String> foodType;
        // 선호하는
        private List<String> restaurantType;
        // 카테고리
    }

    @Getter
    @Setter
    @ToString
    public static class PlaceRequest {
        private List<String> interests;
        // 관심있는
        private List<String> travelStyle;
        // 여행 스타일
    }
}
