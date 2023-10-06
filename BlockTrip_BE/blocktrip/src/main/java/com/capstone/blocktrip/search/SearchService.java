package com.capstone.blocktrip.search;

import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class SearchService {

    private final SearchJPARepository searchJPARepository;

    @Transactional
    public void valid(String mySearch ){
        String keyword = mySearch;
        try {
            // Google 검색 결과 페이지 URL을 생성
            String googleSearchUrl = "https://www.google.com/search?q=" + keyword;

            // Google 검색 결과 페이지를 JSoup를 사용하여 가져옴
            Document document = Jsoup.connect(googleSearchUrl).get();

            // 검색 결과 링크에 해당하는 CSS 선택자를 사용하여 검색 결과 링크 엘리먼트를 선택
            Elements searchResults = document.select(".tF2Cxc");

            // 검색 결과를 순회하며 특정 키워드가 있는지 확인
            for (Element result : searchResults) {
                String title = result.select("h3").text(); // 검색 결과의 제목을 가져옴
                String snippet = result.select(".st").text(); // 검색 결과의 스니펫(요약)을 가져옴

                // 검색 결과에 특정 키워드가 포함되어 있는지 확인
                if (title.contains(keyword) || snippet.contains(keyword)) {
                    System.out.println(keyword + "는 Google 검색 결과에서 키워드를 찾았습니다.");
                    searchJPARepository.save(Search.builder().searchKeyword(keyword).searchResult(keyword).build());
                    return;
                }
            }

            // 키워드를 찾지 못한 경우
            System.out.println(keyword + "는 Google 검색 결과에서 키워드를 찾지 못했습니다.");

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
