package com.capstone.blocktrip.search;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.PlacesApi;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

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



    @Transactional
    public void mapSearchValid(String myLocation, String mySearch) {
        String keyword = mySearch;
        String location = myLocation;

        // Google Maps API 키
        String apiKey = "AIzaSyC7kIg8sg-LwBQKr8vvMDRei8LbEtghA4o";

        // 사용자로부터 지역과 검색어 입력 받기

        // Google Maps 객체 생성
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(apiKey)
                .build();
        // 지역의 좌표 얻기
        LatLng coordinates = getCoordinates(context, location);
        System.out.println("========================");
        System.out.println("좌표값: " + coordinates.toString());
        System.out.println("========================");

        // 주변 장소 검색
        PlacesSearchResponse placesSearchResponse = searchNearbyPlaces(context, coordinates, keyword);
        System.out.println("검색 결과 출력");
        System.out.println("========================");

        // 검색 결과 출력
        printSearchResults(placesSearchResponse);

        searchJPARepository.save(Search.builder().searchKeyword(keyword).searchResult(keyword).build());
    }

    private static LatLng getCoordinates(GeoApiContext context, String location) {
        try {
            GeocodingResult[] results = GeocodingApi.geocode(context, location).await();
            return results[0].geometry.location;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static PlacesSearchResponse searchNearbyPlaces(GeoApiContext context, LatLng location, String keyword) {
        try {
            PlacesSearchResponse response = PlacesApi.nearbySearchQuery(context, location)
                    .radius(5000) // 반경 50km
                    .language("ko")
                    .keyword(keyword)
                    .await();

            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static void printSearchResults(PlacesSearchResponse response) {
        if (response.results.length != 0) {
            for (PlacesSearchResult result : response.results) {
                System.out.println("해당 위치에 존재하는 가게입니다.");
                System.out.println(result.name);
            }
        } else {
            System.out.println("해당 위치에 존재하지 않는 가게입니다.");
        }
    }

    @Transactional
    public void crawlingFlight(String depart, String dest, String departDate, String destDate ) throws InterruptedException {
        String WEB_DRIVER_ID = "webdriver.chrome.driver";
        String WEB_DRIVER_PATH = "chromedriver.exe";


        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        //WebDriver 옵션 설정
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("disable-popup-blocking");
        options.addArguments("disable-defult-apps");

        ChromeDriver driver = new ChromeDriver(options);
        Scanner scanner = new Scanner(System.in);

        System.out.print("출발지를 입력하세요: ");
        // String departureCity = scanner.nextLine();

        System.out.print("도착지를 입력하세요: ");
        // String arrivalCity = scanner.nextLine();

        System.out.print("출발일을 입력하세요 (YYYY-MM-DD): ");
        //  String departureDate = scanner.nextLine();

        System.out.print("반환일을 입력하세요 (YYYY-MM-DD): ");
        //  String returnDate = scanner.nextLine();

        // 쿼리스트링에 임의의 값을 넣어주었습니다. ( 서울 -> 오사카 )
        String url = String.format("https://kr.trip.com/flights/%s-to-%s/tickets-sel-dad?dcity=sel,icn&acity=osa&ddate=%s&rdate=%s&flighttype=rt&class=y&lowpricesource=searchform&quantity=1&searchboxarg=t",
                depart, dest, departDate, destDate);

        driver.executeScript("window.open('about:blank','_blank');");

        List<String> tabs = new ArrayList<>(driver.getWindowHandles());

        //첫번째 탭으로 전환
        driver.switchTo().window(tabs.get(0));

        driver.get(url);

        // 트립닷컴의 항공권 최저가 검색이 완료된 후 크롤링을 진행하기 위해서 10초동안 쉬고 크롤링을 진행합니다.
        Thread.sleep(10000);

        // [class="item-con-price"] span 의 CSS 선택자 요소가 나타날 때까지 대기합니다. (최대 10초)
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // 최저가 항공권의 가격을 추출하기 위한 CSS 선택자 "[class="item-con-price"] span"
        WebElement priceElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[class=\"item-con-price\"] span")));

        // 항공권의 출발/도착 시간을 추출하기 위한 CSS 선택자 ".flight-info-airline__timer_RWx"
        List<WebElement> flightInfoElements = driver.findElements(By.cssSelector(".flight-info-airline__timer_RWx"));

        // 최저가 항공권의 출발 시간을 추출합니다.
        WebElement timeElement = flightInfoElements.get(0).findElement(By.cssSelector(".time"));
        String departureTime = timeElement.getText();

        // 최저가 항공권의 도착 시간을 추출합니다.
        WebElement timeElement2 = flightInfoElements.get(1).findElement(By.cssSelector(".time"));
        String arrivalTime = timeElement2.getText();


        // 결과를 출력합니다.
        System.out.println("\n가격: " + priceElement.getText());
        System.out.println("출발시간: " + departureTime);
        System.out.println("도착시간: " + arrivalTime);

        scanner.close();
    }



}