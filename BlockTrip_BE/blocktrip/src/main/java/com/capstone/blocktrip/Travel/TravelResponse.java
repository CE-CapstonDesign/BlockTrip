package com.capstone.blocktrip.Travel;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

public class TravelResponse {
    @Getter
    @Setter
    @ToString
    public static class OutputDTO {
        private List<String> accommodations;
    }
}
