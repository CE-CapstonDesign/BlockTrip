package com.capstone.blocktrip.search.algorithm;

import com.capstone.blocktrip.Travel.response.TravelResponseDTO;

import java.util.ArrayList;
import java.util.List;

public class SortPath {
    public static void firstDaySort(int arriveHour, TravelResponseDTO travelResponseDTO, Coordinate airportCoordinate, List<Coordinate> realRestaurant, List<Coordinate> realPlace) {
        List<TravelResponseDTO.Place> placeList = new ArrayList<>();
        TravelResponseDTO.Place place = new TravelResponseDTO.Place();
        Coordinate lastVisitedCoordinate = new Coordinate();
        int idx;
        int tempArriveHour = arriveHour;
        if (tempArriveHour < 8) {
            tempArriveHour = 8;
        }
        for (int i = 0; i < realPlace.size(); i++) {
            System.out.println(i + "번째 firstDaySort RealPlace: " + realPlace.get(i).getName());
        }
        for (int i = 0; i < realRestaurant.size(); i++) {
            System.out.println(i + "번째 firstDaySort RealRestaurant: " + realRestaurant.get(i).getName());
        }
        if ((arriveHour >= 8 && arriveHour < 9) || (arriveHour >= 12 && arriveHour < 13) || (arriveHour >= 19 && arriveHour < 20)) {
            idx = ShortestPath.shortestRestaurant(airportCoordinate, realRestaurant);
            place = new TravelResponseDTO.Place();
            place.setName(realRestaurant.get(idx).getName());
            place.setLatitude(String.valueOf(realRestaurant.get(idx).getLatitude()));
            place.setLongitude(String.valueOf(realRestaurant.get(idx).getLongitude()));
            place.setTime(String.valueOf(tempArriveHour));
            placeList.add(place);
            lastVisitedCoordinate.setLongitude(realRestaurant.get(idx).getLongitude());
            lastVisitedCoordinate.setLatitude(realRestaurant.get(idx).getLatitude());
            realRestaurant.remove(idx);
            tempArriveHour++;
        } else {
            idx = ShortestPath.shortestRestaurant(airportCoordinate, realPlace);
            place = new TravelResponseDTO.Place();
            place.setName(realPlace.get(idx).getName());
            place.setLatitude(String.valueOf(realPlace.get(idx).getLatitude()));
            place.setLongitude(String.valueOf(realPlace.get(idx).getLongitude()));
            place.setTime(String.valueOf(tempArriveHour));
            placeList.add(place);
            lastVisitedCoordinate.setLongitude(realPlace.get(idx).getLongitude());
            lastVisitedCoordinate.setLatitude(realPlace.get(idx).getLatitude());
            realPlace.remove(idx);
            if (tempArriveHour >= 13) {
                if ((tempArriveHour == 14) || (tempArriveHour == 16) || (tempArriveHour == 18) || (tempArriveHour == 21)) {
                    tempArriveHour++;
                } else {
                    tempArriveHour = tempArriveHour + 2;
                }
            } else {
                if (!(tempArriveHour >= 22)) {
                    tempArriveHour++;
                }
            }
        }

        for (int i = tempArriveHour; i <= 22;) {
            if ((i >= 8 && i < 9) || (i >= 12 && i < 13) || (i >= 19 && i < 20)) {
                idx = ShortestPath.shortestRestaurant(lastVisitedCoordinate, realRestaurant);
                place = new TravelResponseDTO.Place();
                place.setName(realRestaurant.get(idx).getName());
                place.setLatitude(String.valueOf(realRestaurant.get(idx).getLatitude()));
                place.setLongitude(String.valueOf(realRestaurant.get(idx).getLongitude()));
                place.setTime(String.valueOf(i));
                placeList.add(place);
                lastVisitedCoordinate.setLongitude(realRestaurant.get(idx).getLongitude());
                lastVisitedCoordinate.setLatitude(realRestaurant.get(idx).getLatitude());
                realRestaurant.remove(idx);
                i = i + 1;
            } else if ((i >= 9) && (i < 12)) {
                if (i == 10) {
                    i++;
                    continue;
                }
                idx = ShortestPath.shortestRestaurant(lastVisitedCoordinate, realPlace);
                place = new TravelResponseDTO.Place();
                place.setName(realPlace.get(idx).getName());
                place.setLatitude(String.valueOf(realPlace.get(idx).getLatitude()));
                place.setLongitude(String.valueOf(realPlace.get(idx).getLongitude()));
                place.setTime(String.valueOf(i));
                placeList.add(place);
                lastVisitedCoordinate.setLongitude(realPlace.get(idx).getLongitude());
                lastVisitedCoordinate.setLatitude(realPlace.get(idx).getLatitude());
                realPlace.remove(idx);
                i = i + 1;
            } else {
                idx = ShortestPath.shortestRestaurant(lastVisitedCoordinate, realPlace);
                place = new TravelResponseDTO.Place();
                place.setName(realPlace.get(idx).getName());
                place.setLatitude(String.valueOf(realPlace.get(idx).getLatitude()));
                place.setLongitude(String.valueOf(realPlace.get(idx).getLongitude()));
                place.setTime(String.valueOf(i));
                placeList.add(place);
                lastVisitedCoordinate.setLongitude(realPlace.get(idx).getLongitude());
                lastVisitedCoordinate.setLatitude(realPlace.get(idx).getLatitude());
                realPlace.remove(idx);
                i = i + 2;
            }
        }
        for (int i = 0; i < realPlace.size(); i++) {
            System.out.println(i + " 디버깅용 realPlace: " + realPlace.get(i).getName());
        }
        for (int i = 0; i < realRestaurant.size(); i++) {
            System.out.println(i + " 디버깅용 realRestaurant: " + realRestaurant.get(i).getName());
        }
        travelResponseDTO.getPlaceList().add(placeList);
    }

    public static void lastDaySort(int departHour, TravelResponseDTO travelResponseDTO, Coordinate hotelCoordinate, List<Coordinate> realRestaurant, List<Coordinate> realPlace) {
        List<TravelResponseDTO.Place> placeList = new ArrayList<>();
        TravelResponseDTO.Place place = new TravelResponseDTO.Place();
        Coordinate lastVisitedCoordinate = new Coordinate();
        int idx = ShortestPath.shortestRestaurant(hotelCoordinate, realRestaurant);
        place.setName(realRestaurant.get(idx).getName());
        place.setLatitude(String.valueOf(realRestaurant.get(idx).getLatitude()));
        place.setLongitude(String.valueOf(realRestaurant.get(idx).getLongitude()));
        place.setTime(String.valueOf(8));
        placeList.add(place);
        realRestaurant.remove(idx);
        for (int i = 9; i <= departHour;) {
            if (i == 12 || i == 19) {
                idx = ShortestPath.shortestRestaurant(hotelCoordinate, realRestaurant);
                place = new TravelResponseDTO.Place();
                place.setName(realRestaurant.get(idx).getName());
                place.setLatitude(String.valueOf(realRestaurant.get(idx).getLatitude()));
                place.setLongitude(String.valueOf(realRestaurant.get(idx).getLongitude()));
                place.setTime(String.valueOf(i));
                placeList.add(place);
                lastVisitedCoordinate.setLongitude(realRestaurant.get(idx).getLongitude());
                lastVisitedCoordinate.setLatitude(realRestaurant.get(idx).getLatitude());
                realRestaurant.remove(idx);
                i = i + 1;
            } else if (i == 9 || i == 10 || i == 11) {
                if (i == 10) {
                    i++;
                    continue;
                }
                idx = ShortestPath.shortestRestaurant(lastVisitedCoordinate, realPlace);
                place = new TravelResponseDTO.Place();
                place.setName(realPlace.get(idx).getName());
                place.setLatitude(String.valueOf(realPlace.get(idx).getLatitude()));
                place.setLongitude(String.valueOf(realPlace.get(idx).getLongitude()));
                place.setTime(String.valueOf(i));
                placeList.add(place);
                lastVisitedCoordinate.setLongitude(realPlace.get(idx).getLongitude());
                lastVisitedCoordinate.setLatitude(realPlace.get(idx).getLatitude());
                realPlace.remove(idx);
                i = i + 1;
            } else {
                idx = ShortestPath.shortestRestaurant(lastVisitedCoordinate, realPlace);
                place = new TravelResponseDTO.Place();
                System.out.println("lastday idx: " + idx);
                place.setName(realPlace.get(idx).getName());
                place.setLatitude(String.valueOf(realPlace.get(idx).getLatitude()));
                place.setLongitude(String.valueOf(realPlace.get(idx).getLongitude()));
                place.setTime(String.valueOf(i));
                placeList.add(place);
                lastVisitedCoordinate.setLongitude(realPlace.get(idx).getLongitude());
                lastVisitedCoordinate.setLatitude(realPlace.get(idx).getLatitude());
                realPlace.remove(idx);
                i = i + 2;
            }
        }
        for (int i = 0; i < realPlace.size(); i++) {
            System.out.println(i + " 디버깅용 realPlace: " + realPlace.get(i).getName());
        }
        for (int i = 0; i < realRestaurant.size(); i++) {
            System.out.println(i + " 디버깅용 realRestaurant: " + realRestaurant.get(i).getName());
        }
        travelResponseDTO.getPlaceList().add(placeList);
    }

    public static void restDaySort(TravelResponseDTO travelResponseDTO, Coordinate hotelCoordinate, List<Coordinate> realRestaurant, List<Coordinate> realPlace) {
        List<TravelResponseDTO.Place> placeList = new ArrayList<>();
        TravelResponseDTO.Place place = new TravelResponseDTO.Place();
        Coordinate lastVisitedCoordinate = new Coordinate();
        int idx = ShortestPath.shortestRestaurant(hotelCoordinate, realRestaurant);
        place.setName(realRestaurant.get(idx).getName());
        place.setLatitude(String.valueOf(realRestaurant.get(idx).getLatitude()));
        place.setLongitude(String.valueOf(realRestaurant.get(idx).getLongitude()));
        place.setTime(String.valueOf(8));
        placeList.add(place);
        realRestaurant.remove(idx);
        for (int i = 9; i <= 22;) {
            if (i == 12 || i == 19) {
                idx = ShortestPath.shortestRestaurant(hotelCoordinate, realRestaurant);
                place = new TravelResponseDTO.Place();
                place.setName(realRestaurant.get(idx).getName());
                place.setLatitude(String.valueOf(realRestaurant.get(idx).getLatitude()));
                place.setLongitude(String.valueOf(realRestaurant.get(idx).getLongitude()));
                place.setTime(String.valueOf(i));
                placeList.add(place);
                lastVisitedCoordinate.setLongitude(realRestaurant.get(idx).getLongitude());
                lastVisitedCoordinate.setLatitude(realRestaurant.get(idx).getLatitude());
                realRestaurant.remove(idx);
                i = i + 1;
            } else if (i == 9 || i == 10 || i == 11) {
                if (i == 10) {
                    i++;
                    continue;
                }
                idx = ShortestPath.shortestRestaurant(lastVisitedCoordinate, realPlace);
                place = new TravelResponseDTO.Place();
                place.setName(realPlace.get(idx).getName());
                place.setLatitude(String.valueOf(realPlace.get(idx).getLatitude()));
                place.setLongitude(String.valueOf(realPlace.get(idx).getLongitude()));
                place.setTime(String.valueOf(i));
                placeList.add(place);
                lastVisitedCoordinate.setLongitude(realPlace.get(idx).getLongitude());
                lastVisitedCoordinate.setLatitude(realPlace.get(idx).getLatitude());
                realPlace.remove(idx);
                i = i + 1;
            } else {
                idx = ShortestPath.shortestRestaurant(lastVisitedCoordinate, realPlace);
                System.out.println("restday idx: " + idx);
                place = new TravelResponseDTO.Place();
                place.setName(realPlace.get(idx).getName());
                place.setLatitude(String.valueOf(realPlace.get(idx).getLatitude()));
                place.setLongitude(String.valueOf(realPlace.get(idx).getLongitude()));
                place.setTime(String.valueOf(i));
                placeList.add(place);
                lastVisitedCoordinate.setLongitude(realPlace.get(idx).getLongitude());
                lastVisitedCoordinate.setLatitude(realPlace.get(idx).getLatitude());
                realPlace.remove(idx);
                i = i + 2;
            }
        }
        for (int i = 0; i < realPlace.size(); i++) {
            System.out.println(i + " 디버깅용 realPlace: " + realPlace.get(i).getName());
        }
        for (int i = 0; i < realRestaurant.size(); i++) {
            System.out.println(i + " 디버깅용 realRestaurant: " + realRestaurant.get(i).getName());
        }
        travelResponseDTO.getPlaceList().add(placeList);
    }
}
