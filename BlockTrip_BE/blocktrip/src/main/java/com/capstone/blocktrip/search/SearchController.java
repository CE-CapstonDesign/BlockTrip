package com.capstone.blocktrip.search;

import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@Controller
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/index")
    public String indexPage(){
        return "index";
    }

    @PostMapping("/crawl")
    public String crawlWebsite(@RequestParam("search") String mySearch) {
        searchService.valid(mySearch);
        return "index";
    }

}
