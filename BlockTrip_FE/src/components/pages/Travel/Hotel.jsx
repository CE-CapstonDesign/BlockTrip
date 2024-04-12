import { getAddressFromLatLng } from "@/utils/getAddressFromLatLng";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useState } from "react";
import { setKey, setLanguage, setRegion } from "react-geocode";

setKey(import.meta.env.VITE_GOOGLE_KEY);
setLanguage("ko");
setRegion("es");

const Hotel = ({ data }) => {
  const [hotelAddress, setHotelAddress] = useState("");
  // const hotel = data.name.replace(/&| /g, "+");

  const getAddress = async () => {
    const address = await getAddressFromLatLng(data.latitude, data.longitude);
    setHotelAddress(address);
  };

  getAddress();

  return (
    <div>
      <p className="text-neutral-500 text-3xl mb-8">숙박 정보</p>
      <div className="flex text-xl">
        <div className="text-neutral-500 leading-10">
          <p>숙소 이름</p>
          <p>숙소 위치</p>
          <p>가격</p>
        </div>
        <div className="ml-10 leading-10">
          <p>{data.name}</p>
          <p>{hotelAddress}</p>
          <p>{data.price}</p>
        </div>
      </div>
      <Wrapper>
        <iframe
          className="mt-4"
          width="1000px"
          height="300px"
          src={`https://www.google.com/maps/embed/v1/place?key=${
            import.meta.env.VITE_GOOGLE_KEY
          }&q=${data.latitude}, ${data.longitude}&zoom=12`}
        />
      </Wrapper>
    </div>
  );
};

export default Hotel;
