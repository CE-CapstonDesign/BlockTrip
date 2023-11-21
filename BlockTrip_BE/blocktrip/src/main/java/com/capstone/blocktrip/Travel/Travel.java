package com.capstone.blocktrip.Travel;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "travels")
public class Travel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "destination")
    private String destination;

    @Column(name = "budget")
    private Double budget;

    @Column(name = "duration")
    private String duration; // Date를 써야할까?

    @Column(name = "interests")
    private String interests;

    @Column(name = "transport")
    private String transport;

    @Column(name = "travel_style")
    private String travelStyle;

    @Column(name = "food_type")
    private String foodType;

//    @Column(name = "accommodations")
//    private List<String> accommodations;

    @Builder
    public Travel(String destination, Double budget, String duration, String interests, String transport, String travelStyle, String foodType, List<String> accommodations) {
        this.destination = destination;
        this.budget = budget;
        this.duration = duration;
        this.interests = interests;
        this.transport = transport;
        this.travelStyle = travelStyle;
        this.foodType = foodType;
//        this.accommodations = accommodations;
    }

}
