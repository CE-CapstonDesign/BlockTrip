package com.capstone.blocktrip.Travel;

import com.capstone.blocktrip.Travel.response.TravelResponseDTO;
import com.capstone.blocktrip._core.utils.ApiUtils;
import com.capstone.blocktrip.search.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/travel")
public class TravelController {

    private final TravelService travelService;
    private final SearchService searchService;
    TravelResponseDTO travelResponseDTO = new TravelResponseDTO();

    @Autowired
    public TravelController(TravelService travelService, SearchService searchService) {
        this.travelService = travelService;
        this.searchService = searchService;
    }

    @PostMapping("/plan")
    public ResponseEntity<?> createTravelPlan(@RequestBody TravelRequest request) {
        TravelResponse travelPlan = travelService.generatePlan(request);
        travelResponseDTO = searchService.shortestPath(request,travelPlan);
        return ResponseEntity.ok(ApiUtils.success(travelResponseDTO));
    }

    @GetMapping("/plan")
    public ResponseEntity<?> getTravelPlan(){
        return ResponseEntity.ok(ApiUtils.success(travelResponseDTO));
    }
}


