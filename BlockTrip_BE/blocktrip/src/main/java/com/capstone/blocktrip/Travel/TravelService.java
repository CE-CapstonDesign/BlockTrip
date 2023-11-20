package com.capstone.blocktrip.Travel;

import com.capstone.blocktrip.ChatGPT.ChatGPTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TravelService {
    private final ChatGPTService chatGPTService;

    @Autowired
    public TravelService(ChatGPTService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }

    public TravelResponse.OutputDTO generatePlan(TravelRequest.InputDTO request) {
        String prompt = createPromptFromRequest(request);

        String gpt3Response = chatGPTService.callGPT3(prompt);

        TravelResponse.OutputDTO output = parseGpt3ResponseToTravelOutput(gpt3Response);
        return output;
    }

    private String createPromptFromRequest(TravelRequest.InputDTO request) {
        StringBuilder promptBuilder = new StringBuilder();

        promptBuilder.append("여행지: ").append(request.getDestination()).append("\n");
        promptBuilder.append("예산: ").append(request.getBudget()).append("\n");
        //추후 모든 input요소에 대한 추가 필요
        promptBuilder.append("이 정보를 바탕으로 ").append(request.getDestination())
                .append("에서 방문하기 좋은 장소, 식당, 관광지를 각각 10개씩 출력해.");

        return promptBuilder.toString();
    }

    private TravelResponse.OutputDTO parseGpt3ResponseToTravelOutput(String gpt3Response) {
        return new TravelResponse.OutputDTO();
    }

}
