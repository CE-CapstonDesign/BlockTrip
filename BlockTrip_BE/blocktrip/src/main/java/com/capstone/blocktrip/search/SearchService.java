package com.capstone.blocktrip.search;

import com.capstone.blocktrip.Travel.TravelRequest;
import com.capstone.blocktrip.Travel.TravelResponse;
import com.capstone.blocktrip.Travel.response.TravelResponseDTO;
import com.capstone.blocktrip._core.errors.exception.Exception500;
import com.capstone.blocktrip.search.algorithm.Coordinate;
import com.capstone.blocktrip.search.algorithm.SortPath;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.PlacesApi;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URLEncoder;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@EnableConfigurationProperties
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class SearchService {


    // Google Maps API 키
    @Value("${api.google.maps.key}")
    private String apiKey;

    public Coordinate getCoordinate(String myLocation, String mySearch) {
        Coordinate myCoordinate = new Coordinate();
        String keyword = mySearch;
        String location = myLocation + " " + mySearch;
        System.out.println("디버깅용 keyword: " + keyword);
        System.out.println("디버깅용 location: " + location);

        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(apiKey)
                .build();

        LatLng coordinates = getCoordinates(context, location);
        if (coordinates != null) {
            myCoordinate.setName(mySearch);
            myCoordinate.setLatitude(coordinates.lat);
            myCoordinate.setLongitude(coordinates.lng);

            // 역지오코딩을 통해 주소를 가져와 설정
            String address = reverseGeocode(myCoordinate);
            System.out.println("주소: " + address);
        }
        return myCoordinate;
    }

    private static LatLng getCoordinates(GeoApiContext context, String location) {
        try {
            GeocodingResult[] results = GeocodingApi.geocode(context, location).await();
            if (results.length == 0) {
                System.out.println("No coordinates found for location: " + location);
                return null;
            }
            return results[0].geometry.location;
        } catch (Exception e) {
            System.out.println("Error obtaining coordinates for location: " + location);
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    public boolean mapSearchValid(String myLocation, String mySearch) {
        String keyword = mySearch;
        String location = myLocation;

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
        return printSearchResults(placesSearchResponse);
    }

    private static PlacesSearchResponse searchNearbyPlaces(GeoApiContext context, LatLng location, String keyword) {
        try {
            return PlacesApi.nearbySearchQuery(context, location)
                    .radius(10000) // 반경 10km
                    .language("ko")
                    .keyword(keyword)
                    .await();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static boolean printSearchResults(PlacesSearchResponse response) {
        if (response != null && response.results.length != 0) {
            for (PlacesSearchResult result : response.results) {
                System.out.println("해당 위치에 존재하는 가게입니다.");
                System.out.println(result.name);
            }
            return true;
        } else {
            System.out.println("해당 위치에 존재하지 않는 가게입니다.");
            return false;
        }
    }

    private Coordinate calculateMidpointFromPlaces(List<TravelResponseDTO.Place> places) {
        double midLat = 0;
        double midLon = 0;

        for (TravelResponseDTO.Place place : places) {
            midLat += Double.parseDouble(place.getLatitude());
            midLon += Double.parseDouble(place.getLongitude());
        }

        midLat /= places.size();
        midLon /= places.size();

        Coordinate midpoint = new Coordinate("Midpoint", midLat, midLon);
        return midpoint;
    }

    private String reverseGeocode(Coordinate coordinate) {
        try {
            GeoApiContext context = new GeoApiContext.Builder().apiKey(apiKey).build();
            LatLng latLng = new LatLng(coordinate.getLatitude(), coordinate.getLongitude());
            GeocodingResult[] results = GeocodingApi.reverseGeocode(context, latLng).await();
            if (results.length > 0) {
                // 첫 번째 결과를 사용하여 주소 반환
                return results[0].formattedAddress;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private WebDriver setupWebDriver() {
        String WEB_DRIVER_ID = "webdriver.chrome.driver";
        String WEB_DRIVER_PATH = "chromedriver.exe";
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized", "disable-popup-blocking", "disable-default-apps");
        return new ChromeDriver(options);
    }

    private void crawlingHotel(String dest, String checkin, String checkout, String option, String adult, String room, String child, TravelResponseDTO travelResponseDTO, int dayIndex) {
        String WEB_DRIVER_ID = "webdriver.chrome.driver";
        String WEB_DRIVER_PATH = "chromedriver.exe";
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("disable-popup-blocking");
        options.addArguments("disable-default-apps");

        WebDriver driver = new ChromeDriver(options);

        try {
            String encodedDestination = URLEncoder.encode(dest, "UTF-8");
            String url = "https://www.booking.com/searchresults.en-gb.html?ss=" + encodedDestination +
                    "&label=gen173nr-1BCAEoggI46AdIM1gEaH2IAQGYAQm4ARfIAQzYAQHoAQGIAgGoAgO4Ao_V-6oGwAIB0gIkZjlhYTI3MTMtNjBiYi00NGE2-LWE1MTQtZTRhOTgwMmVkMmEy2AIF4AIB" +
                    "&sid=986d075024858043272bea5d90b0d8d1&aid=304142&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_type=region" +
                    "&checkin=" + checkin + "&checkout=" + checkout +
                    "&group_adults=" + adult + "&no_rooms=" + room + "&group_children=" + child + "&order=" + option;

            driver.get(url);

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            List<WebElement> hotelElements = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector("div[data-testid='property-card-container']")));

            Map<Integer, List<TravelResponseDTO.Hotel>> hotelsByDay = new HashMap<>();

            if (!hotelElements.isEmpty()) {
                WebElement hotelElement = hotelElements.get(0); // 크롤링 페이지의 첫 번째 호텔 선택
                try {
                    System.out.println("호텔 디버깅: " + hotelElement.getText() + '\n');
                    String name = hotelElement.findElement(By.cssSelector("div[data-testid='title']")).getText().trim();
                    String price = hotelElement.findElement(By.cssSelector("span[data-testid='price-and-discounted-price']")).getText().trim();
                    String hotelAddress = hotelElement.findElement(By.cssSelector("span[data-testid='address']")).getText().trim();
                    Coordinate hotelCoordinate = getCoordinate(dest, hotelAddress);

                    TravelResponseDTO.Hotel hotel = new TravelResponseDTO.Hotel();
                    hotel.setName(name);
                    hotel.setPrice(price);
                    hotel.setLatitude(String.valueOf(hotelCoordinate.getLatitude()));
                    hotel.setLongitude(String.valueOf(hotelCoordinate.getLongitude()));

                    hotelsByDay.putIfAbsent(dayIndex, new ArrayList<>());
                    hotelsByDay.get(dayIndex).add(hotel);

                    travelResponseDTO.getHotels().add(hotel);
                } catch (StaleElementReferenceException e) {
                    System.out.println("StaleElementReferenceException 발생, 요소를 다시 찾습니다.");
                    hotelElements = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector("div[data-testid='property-card-container']")));
                    addEmptyHotel(travelResponseDTO, dayIndex);
                }
            } else {
                addEmptyHotel(travelResponseDTO, dayIndex);
            }
        } catch (TimeoutException e) {
            System.out.println("TimeoutException 발생: " + e.getMessage());
            addEmptyHotel(travelResponseDTO, dayIndex);
        } catch (Exception e) {
            e.printStackTrace();
            addEmptyHotel(travelResponseDTO, dayIndex);
        } finally {
            if (driver != null) {
                driver.quit();
            }
        }
        System.out.println("호텔 검색 완료.");
    }

    private void addEmptyHotel(TravelResponseDTO travelResponseDTO, int dayIndex) {
        TravelResponseDTO.Hotel emptyHotel = new TravelResponseDTO.Hotel();
        emptyHotel.setName("No hotel found");
        emptyHotel.setPrice("N/A");
        emptyHotel.setLatitude("N/A");
        emptyHotel.setLongitude("N/A");
        while (travelResponseDTO.getHotels().size() <= dayIndex) {
            travelResponseDTO.getHotels().add(new TravelResponseDTO.Hotel());
        }
        travelResponseDTO.getHotels().set(dayIndex, emptyHotel);
    }
    private void updateHotelCoordinates(TravelResponseDTO travelResponseDTO, Coordinate midpoint, String checkin, String checkout, String adult, String room, String child, String sort, int dayIndex) {
        // 역지오코딩하여 중간 지점의 주소를 가져옴
        String midpointAddress;
        try {
            midpointAddress = reverseGeocode(midpoint);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to reverse geocode midpoint");
        }
        // 호텔 크롤링 및 좌표 업데이트
        crawlingHotel(midpointAddress, checkin, checkout, sort, adult, room, child, travelResponseDTO, dayIndex);
    }

    @Transactional
    public void crawlingFlight(String depart, String dest, String departDate, String destDate, String flightType, String seatClass, String quantity, String childqty, String babyqty, TravelResponseDTO travelResponseDTO, int idx) throws InterruptedException {
        String WEB_DRIVER_ID = "webdriver.chrome.driver";
        String WEB_DRIVER_PATH = "chromedriver.exe";

        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        //WebDriver 옵션 설정
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("disable-popup-blocking");
        options.addArguments("disable-defult-apps");

        ChromeDriver driver = new ChromeDriver(options);

        // A공항과 B공항을 저장할 변수 초기화
        String departure = null;
        String destination = null;
        String regex = "[a-z]{3}";
        boolean isTrue = true;
        if(Pattern.matches(regex, depart) && Pattern.matches(regex,dest)){
            departure = depart;
            destination = dest;
        } else {
            Pattern pattern = Pattern.compile("[A-Z]{3}"); // 세 글자의 대문자 알파벳만 매칭하는 패턴
            // Google Maps에서 공항 약자를 가지고 옵니다.
            String googleMaps = String.format("https://www.google.co.kr/maps/dir/%s/%s", depart, dest);
            driver.get(googleMaps);
            WebElement flightInfoElement = driver.findElement(By.className("LE0rHc"));
            WebElement spanElement = flightInfoElement.findElement(By.tagName("i"));
            String flightInfoText = spanElement.getText();

            // 항공편 정보 출력
            System.out.println("공항 약자 정보: " + flightInfoText);
            // 정규표현식 패턴 설정

            // 패턴을 이용하여 문자열에서 매칭되는 부분을 찾음
            Matcher matcher = pattern.matcher(flightInfoText);

            // 매칭된 부분을 반복하여 추출
            int i = 0;
            while (matcher.find() && i < 2) { // 처음 두 개의 매칭 부분을 찾음
                if (i == 0) {
                    departure = matcher.group(); // 첫 번째 매칭된 부분을 출발지로 저장
                } else {
                    destination = matcher.group(); // 두 번째 매칭된 부분을 도착지로 저장
                }
                i++;
            }
        }
        // 쿼리스트링에 임의의 값을 넣어주었습니다. ( 서울 -> 오사카 )
        String url = String.format("https://kr.trip.com/flights/%s-to-%s/tickets-sel-dad?dcity=%s&acity=%s&ddate=%s&rdate=%s&flighttype=%s&class=%s&lowpricesource=searchform&quantity=%s&childqty=%s&babyqty=%s&searchboxarg=t",
                departure, destination, departure, destination, departDate, destDate, flightType, seatClass, quantity, childqty, babyqty);

        driver.get(url);

        // 트립닷컴의 항공권 최저가 검색이 완료된 후 크롤링을 진행하기 위해서 10초동안 쉬고 크롤링을 진행합니다.
        Thread.sleep(8000);

        // [class="item-con-price"] span 의 CSS 선택자 요소가 나타날 때까지 대기합니다. (최대 10초)
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(8));

        // [class="item-con-price"] span 의 CSS 선택자 요소가 나타날 때까지 대기합니다. (최대 10초)
        wait = new WebDriverWait(driver, Duration.ofSeconds(8));

        // 최저가 항공권의 가격을 추출하기 위한 CSS 선택자 "[class^=\"item-con-price_\"]"
        WebElement priceElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[class^=\"item-con-price_\"]")));

        // 항공권의 출발/도착 시간을 추출하기 위한 CSS 선택자 ".flight-info-airline__timer_RWx"
        List<WebElement> flightInfoElements = driver.findElements(By.cssSelector("[class^=\"flight-info-airline__timers\"]"));

        List<WebElement> flightNameElements = driver.findElements(By.cssSelector("[class^=\"flights-name\"]"));

        // 최저가 항공권의 출발 시간을 추출합니다.
        WebElement timeElement = flightInfoElements.get(0).findElement(By.cssSelector("[class^=\"time_\"]"));
        String departureTime = timeElement.getText();

        // 최저가 항공권의 도착 시간을 추출합니다.
        WebElement timeElement2 = flightInfoElements.get(1).findElement(By.cssSelector("[class^=\"time_\"]"));
        String arrivalTime = timeElement2.getText();

        // 최저가 항공권의 항공편 이름을 추출합니다.
        String flightName = flightNameElements.get(0).getText();

        // 최저가 항공권의 비행 소요 시간
        WebElement durationElement = driver.findElement(By.cssSelector("[class^=\"flight-info-duration\"]"));
        String duration = durationElement.getText();

        // 결과를 출력합니다.
        System.out.println("====== 최저가 항공권에 대한 정보 ======");
        System.out.println("항공편 이름: " + flightName);
        System.out.println("가격: " + priceElement.getText());
        System.out.println("출발시간: " + departureTime);
        System.out.println("도착시간: " + arrivalTime);
        System.out.println("소요시간: " + duration);

        System.out.println("사이즈 디버깅: " + travelResponseDTO.getFlightList().size());
        travelResponseDTO.getFlightList().get(idx).setFlightname(flightName);
        travelResponseDTO.getFlightList().get(idx).setPrice(priceElement.getText());
        travelResponseDTO.getFlightList().get(idx).setDepart(departureTime);
        travelResponseDTO.getFlightList().get(idx).setArrive(arrivalTime);
        travelResponseDTO.getFlightList().get(idx).setDuration(duration);
        travelResponseDTO.getFlightList().get(idx).setDepartDate(departDate);
        travelResponseDTO.getFlightList().get(idx).setRegion(depart);
    }

    // GPT로부터 추천 받은 요소들을 최단 거리로 변환
    public TravelResponseDTO shortestPath(TravelRequest travelRequestDTO, TravelResponse travelPlan) {
        TravelResponseDTO travelResponseDTO = new TravelResponseDTO();
        travelResponseDTO.getFlightList().add(new TravelResponseDTO.Flight());
        travelResponseDTO.getFlightList().add(new TravelResponseDTO.Flight());

        // 출발일
        String departDate = travelRequestDTO.getCommon().getDepartureDate();
        // 도착일
        String arrivalDate = travelRequestDTO.getCommon().getArrivalDate();
        // 출발지
        String departureLocation = travelRequestDTO.getCommon().getDepartureLocation();
        // 도착지
        String destinationLocation = travelRequestDTO.getCommon().getDestinationLocation();

        // *** 항공권 옵션
        String flightSeatClass = null;
        String flightFype = null;
        String flightDepart = null;
        String flightArrive = null;
        String flightDepartDate = null;
        String flightArriveDate = null;
        String flightQuantity = null;
        String flightChildQuantity = null;
        String flightBabyQuantity = null;

        if (travelRequestDTO.getFlight() != null) {
            flightSeatClass = travelRequestDTO.getFlight().getSeatClass();
            flightFype = travelRequestDTO.getFlight().getFlightType();
            flightDepart = travelRequestDTO.getFlight().getDepart();
            flightArrive = travelRequestDTO.getFlight().getArrive();
            flightDepartDate = travelRequestDTO.getFlight().getDepartDate();
            flightArriveDate = travelRequestDTO.getFlight().getArriveDate();
            flightQuantity = travelRequestDTO.getFlight().getQuantity();
            flightChildQuantity = travelRequestDTO.getFlight().getChildQuantity();
            flightBabyQuantity = travelRequestDTO.getFlight().getBabyQuantity();
        }

        // 호텔 옵션
        String hotelCheckin = travelRequestDTO.getHotel().getCheckin();
        String hotelCheckout = travelRequestDTO.getHotel().getCheckout();
        String hotelAdult = travelRequestDTO.getHotel().getAdult();
        String hotelRoom = travelRequestDTO.getHotel().getRoom();
        String hotelChild = travelRequestDTO.getHotel().getChild();
        String hotelSort = travelRequestDTO.getHotel().getSort();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // String -> Data 형으로 변환
        LocalDate departDateFormat = LocalDate.parse(departDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate arrivalDateFormat = LocalDate.parse(arrivalDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // 두 날짜 간의 일수 계산
        long daysBetween = ChronoUnit.DAYS.between(departDateFormat, arrivalDateFormat);

        // 항공권 및 호텔 추천 받기
        try {
            // 여행지로 가는 항공권 크롤링
            crawlingFlight(flightDepart, flightArrive, flightDepartDate, flightDepartDate, flightFype, flightSeatClass, flightQuantity, flightChildQuantity, flightBabyQuantity, travelResponseDTO, 0);
            // 여행지로 도착하는 항공권 크롤링
            crawlingFlight(flightArrive, flightDepart, flightArriveDate, flightArriveDate, flightFype, flightSeatClass, flightQuantity, flightChildQuantity, flightBabyQuantity, travelResponseDTO, 1);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        Coordinate airportCoordinate = getCoordinate(destinationLocation, destinationLocation + " 공항");
        travelResponseDTO.getFlightList().get(0).setLongitude(String.valueOf(airportCoordinate.getLongitude()));
        travelResponseDTO.getFlightList().get(0).setLatitude(String.valueOf(airportCoordinate.getLatitude()));
        travelResponseDTO.getFlightList().get(1).setLongitude(String.valueOf(airportCoordinate.getLongitude()));
        travelResponseDTO.getFlightList().get(1).setLatitude(String.valueOf(airportCoordinate.getLatitude()));

        List<Coordinate> realRestaurant = new ArrayList<>();
        List<Coordinate> realPlace = new ArrayList<>();
        // 식당 할루시네이션 처리
        for (int i = 0; i < travelPlan.getRecommendedRestaurants().size(); i++) {
            if (mapSearchValid(destinationLocation, travelPlan.getRecommendedRestaurants().get(i))) {
                Coordinate restaurantCoordinate = getCoordinate(destinationLocation, travelPlan.getRecommendedRestaurants().get(i));
                if (restaurantCoordinate.getName() != null) {
                    realRestaurant.add(restaurantCoordinate);
                    System.out.println("Restaurant 추가되었습니다!: " + restaurantCoordinate.getName() + "위도와 경도: " + restaurantCoordinate.getLatitude() + ", " + restaurantCoordinate.getLongitude());
                }
            }
        }
        // 관광명소 할루시네이션 처리
        for (int i = 0; i < travelPlan.getRecommendedPlaces().size(); i++) {
            if (mapSearchValid(destinationLocation, travelPlan.getRecommendedPlaces().get(i))) {
                Coordinate placeCoordinate = getCoordinate(destinationLocation, travelPlan.getRecommendedPlaces().get(i));
                if (placeCoordinate.getName() != null) {
                    realPlace.add(placeCoordinate);
                    System.out.println("Place 추가되었습니다!: " + placeCoordinate.getName() + "위도와 경도: " + placeCoordinate.getLatitude() + ", " + placeCoordinate.getLongitude());
                }
            }
        }

        System.out.println("디버깅용 realRestaurant size : " + realRestaurant.size());
        System.out.println("디버깅용 realPlace size : " + realPlace.size());

        // 여행지 도착 시간을 추출합니다.
        String arriveTime = travelResponseDTO.getFlightList().get(0).getArrive();
        int arriveHour = Integer.parseInt(arriveTime.split(":")[0]);

        // 귀국을 위한 항공권 탑승 시간을 추출합니다.
        String departTime = travelResponseDTO.getFlightList().get(1).getDepart();
        int departHour = Integer.parseInt(departTime.split(":")[0]);
        try {
            Coordinate lastHotelCoordinate = null;
            for (long i = 0; i <= daysBetween; i++) {
                if (i == 0) { // 첫째 날
                    SortPath.firstDaySort(arriveHour, travelResponseDTO, airportCoordinate, realRestaurant, realPlace);
                    lastHotelCoordinate = calculateMidpointFromPlaces(travelResponseDTO.getPlaceList().get((int) i));
                    updateHotelCoordinates(travelResponseDTO, lastHotelCoordinate, hotelCheckin, hotelCheckout, hotelAdult, hotelRoom, hotelChild, hotelSort, (int) i);
                } else if (i == daysBetween) { // 마지막 날
                    SortPath.lastDaySort(departHour, travelResponseDTO, lastHotelCoordinate, realRestaurant, realPlace);
                } else { // 나머지 날
                    SortPath.restDaySort(travelResponseDTO, lastHotelCoordinate, realRestaurant, realPlace);
                    lastHotelCoordinate = calculateMidpointFromPlaces(travelResponseDTO.getPlaceList().get((int) i));
                    updateHotelCoordinates(travelResponseDTO, lastHotelCoordinate, hotelCheckin, hotelCheckout, hotelAdult, hotelRoom, hotelChild, hotelSort, (int) i);
                }
            }
        } catch (Exception e) {
            System.out.println("에러 원인: " + e.getMessage());
            throw new Exception500("서버에서 처리 과정 중 오류가 발생하였습니다.");
        }
        return travelResponseDTO;
    }
}