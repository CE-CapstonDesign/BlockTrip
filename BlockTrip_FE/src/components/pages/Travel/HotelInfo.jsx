import { setKey, setLanguage } from "react-geocode";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useState, useEffect } from "react";
import { getAddressFromLatLng } from "@/utils/geocode";
import { PlaceInfo } from "./PlaceInfo";

setKey(import.meta.env.VITE_GOOGLE_KEY);
setLanguage("en");

const HotelInfo = ({ location, data, hotelIndex }) => {
  const [hotelAddress, setHotelAddress] = useState("");
  const getAddress = async () => {
    const address = await getAddressFromLatLng(
      data[hotelIndex].latitude,
      data[hotelIndex].longitude
    );
    setHotelAddress(address);
  };

  useEffect(() => {
    getAddress();
  }, [hotelIndex]);

  if (location === "N/A") {
    return <p className="leading-10">호텔을 찾지 못했습니다.</p>;
  } else {
    return (
      <section>
        <div className="[&>*]:leading-10">
          <PlaceInfo data={data[hotelIndex].name}>숙소 이름</PlaceInfo>
          <PlaceInfo data={hotelAddress}>숙소 위치</PlaceInfo>
          <PlaceInfo data={data[hotelIndex].price}>가격</PlaceInfo>
        </div>
        <Wrapper>
          <iframe
            className="mt-4"
            width="900px"
            height="400px"
            src={`https://www.google.com/maps/embed/v1/place?key=${
              import.meta.env.VITE_GOOGLE_KEY
            }&q=${data[hotelIndex].latitude}, ${
              data[hotelIndex].longitude
            }&zoom=12`}
          />
        </Wrapper>
      </section>
    );
  }
};

export default HotelInfo;
