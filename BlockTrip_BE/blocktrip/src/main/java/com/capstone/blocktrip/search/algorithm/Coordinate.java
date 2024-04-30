package com.capstone.blocktrip.search.algorithm;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class Coordinate {
    // 장소 이름
    private String name;
    // 위도
    private double latitude;
    // 경도
    private double longitude;

    public Coordinate() {
    }

    public Coordinate(String name, double latitude, double longitude) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
