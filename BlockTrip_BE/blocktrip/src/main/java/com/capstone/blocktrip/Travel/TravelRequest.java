package com.capstone.blocktrip.Travel;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

public class TravelRequest {

    @Getter
    @Setter
    @ToString
    public static class InputDTO {
        private String destination;
        private Double budget;
        private String duration;
        private String interests;
        private String transport;
        private String travelStyle;
        private String foodType;
    }

}