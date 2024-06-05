import TravelInfo from "./TravelInfo";
import logoWhite from "/logo-white.png";
import title from "/title.png";
import downArrow from "/down-arrow.png";
import FlightInfo from "./FlightInfo";
import HotelInfo from "./HotelInfo";
import TasteInfo from "./TasteInfo";
import FoodInfo from "./FoodInfo";
import arrow from "/arrow.png";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import routes from "@/routes";
import { HOTEL } from "@/constants/hotel";
import { SEAT } from "@/constants/flight";
import { travelPlan } from "@/services/travel";
import { Error } from "../Error";

export const Home = () => {
  const navigate = useNavigate();

  const methods = useForm();
  const { handleSubmit } = methods;
  const [request, setRequest] = useState({});

  const mutation = useMutation({
    mutationFn: travelPlan,
  });

  const handleOnClick = () => {
    mutation.mutate(request, {
      onSuccess: () => {
        navigate(routes.result);
      },
      onError: (error) => {
        return <Error error={error} />;
      },
    });
  };

  const onSubmit = (data) => {
    const flight = data.flighttype === "왕복" ? "ow" : "rt";
    const request = {
      common: {
        destinationLocation: data.destinationLocation,
        departureDate: data.departureDate,
        arrivalDate: data.arrivalDate,
      },
      restaurant: {
        foodType: data.foodType || ["all"],
        restaurantType: data.restaurantType || ["all"],
      },
      place: {
        interests: data.interests || ["all"],
        travelStyle: data.travelStyle || ["all"],
      },
      hotel: {
        region: data.destinationLocation,
        checkin: data.departureDate,
        checkout: data.arrivalDate,
        adult: data.adult || 1,
        room: data.room || 1,
        child: data.child || 0,
        sort: HOTEL[data.sort],
      },
      flight: {
        depart: data.depart,
        arrive: data.destinationLocation,
        departDate: data.departureDate,
        arriveDate: data.arrivalDate,
        flighttype: flight || "rt",
        class: SEAT[data.class],
        quantity: data.adult || 1,
        childqty: data.child || 0,
        babyqty: data.babyqty || 0,
      },
    };

    setRequest(request);
  };

  return (
    <div className="scroll-smooth overflow-y-auto">
      <div className="flex flex-col bg-cover bg-[url('/main.png')] h-screen">
        <div className="p-12">
          <img src={logoWhite} className="w-48" />
          <div className="flex flex-col justify-start pl-16 mx-0 my-72">
            <img src={title} className="w-[40rem]" />
            <a
              href="#travelInfo"
              className="w-16 hover:duration-100 hover:w-20"
            >
              <img
                src={downArrow}
                className="w-16 mt-10 cursor-pointer hover:duration-100 hover:w-20"
              />
            </a>
          </div>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-56 pt-5 pb-16 [&>*]:mt-28" id="travelInfo">
              <TravelInfo />
              <FlightInfo />
              <HotelInfo />
              <TasteInfo />
              <FoodInfo />
            </div>
            <div className="flex justify-end items-end">
              <button type="button" onClick={handleOnClick}>
                <img
                  src={arrow}
                  alt="show result"
                  className="w-[12rem] p-10 mr-40 hover:duration-100 hover:w-[14rem] mb-10"
                />
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
