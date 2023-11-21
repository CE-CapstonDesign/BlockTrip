package com.capstone.blocktrip.Travel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/travel")
public class TravelController {

    private final TravelService travelService;

    @Autowired
    public TravelController(TravelService travelService) {
        this.travelService = travelService;
    }

    @PostMapping("/plan")
    public ResponseEntity<TravelResponse.OutputDTO> createTravelPlan(@RequestBody TravelRequest.InputDTO request) {
        TravelResponse.OutputDTO travelPlan = travelService.generatePlan(request);
        return ResponseEntity.ok(travelPlan);
    }
}


