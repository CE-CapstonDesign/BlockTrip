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
    return (
      <div className="text-lg">
        <p className="leading-10">
          여행지 주변의 호텔을 찾지 못했습니다. 직접 선택해보세요.
        </p>
        <a
          href="https://www.booking.com"
          target="_blank"
          rel="noreferrer noopener"
          className="text-sky-700 font-bold"
        >
          -&gt; 호텔 찾기
        </a>
      </div>
    );
  } else {
    return (
      <section>
        <div className="[&>*]:leading-10">
          <PlaceInfo data={data[hotelIndex]?.name}>숙소 이름</PlaceInfo>
          <PlaceInfo data={hotelAddress}>숙소 위치</PlaceInfo>
          <PlaceInfo data={data[hotelIndex]?.price}>가격</PlaceInfo>
        </div>
        <Wrapper>
          <iframe
            className="mt-4"
            width="900px"
            height="400px"
            src={`https://www.google.com/maps/embed/v1/place?key=${
              import.meta.env.VITE_GOOGLE_KEY
            }&q=${data[hotelIndex]?.latitude}, ${
              data[hotelIndex]?.longitude
            }&zoom=12`}
          />
        </Wrapper>
      </section>
    );
  }
};

export default HotelInfo;
