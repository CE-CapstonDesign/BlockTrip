import TravelInfo from "../../CategoryInput/TravelInfo";
import logoWhite from "/logo-white.png";
import title from "/title.png";
import downArrow from "/down-arrow.png";
import FlightInfo from "../../CategoryInput/FlightInfo";
import HotelInfo from "../../CategoryInput/HotelInfo";
import Taste from "../../CategoryInput/Taste";
import Food from "../../CategoryInput/Food";
import arrow from "/arrow.png";
import routes from "../../../routes";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { travelPlan } from "../../../services/travel";
import { useForm, FormProvider } from "react-hook-form";
import { LOCATION } from "../../../constants/location";
import { HOTEL } from "../../../constants/hotel";
import { SEAT } from "../../../constants/flight";
import { useState } from "react";

const Home = () => {
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
        console.log("success");
        navigate(routes.result);
      },
      onError: (error) => {
        console.error(error);
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
        depart: LOCATION[data.depart],
        arrive: LOCATION[data.destinationLocation],
        departDate: data.departureDate,
        arriveDate: data.arrivalDate,
        flighttype: flight || "ow",
        class: SEAT[data.class],
        quantity: data.adult || 1,
        childqty: data.child || 0,
        babyqty: data.babyqty || 0,
      },
    };

    console.log("data: ", data);
    console.log("request:", request);
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
            <div className="px-56 py-24">
              <TravelInfo id="travelInfo" />
              <div className="mt-24">
                <FlightInfo />
              </div>
              <div className="mt-24">
                <HotelInfo />
              </div>
              <div className="mt-24">
                <Taste />
              </div>
              <div className="mt-24">
                <Food />
              </div>
            </div>
            <div className="flex justify-end items-end">
              <button type="button" onClick={handleOnClick}>
                <img
                  src={arrow}
                  alt="show-result"
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

export default Home;
