import { Wrapper } from "@googlemaps/react-wrapper";
import { useState } from "react";
import { Button } from "@/components/features/ui";
import { setKey, setLanguage, setRegion } from "react-geocode";
import { TRANSPORTATION_TYPE } from "@/constants/location";

setKey(import.meta.env.VITE_GOOGLE_KEY);
setLanguage("en");
setRegion("es");

const Route = ({ data }) => {
  const basicTransportation = Object.keys(TRANSPORTATION_TYPE)[0];
  const [filter, setFilter] = useState(0);
  const [transportation, setTransportation] = useState(basicTransportation);

  const name = data[filter].flatMap((x) => x.name.replace("&", "+"));
  const len = name.length;

  const locationInfo =
    len > 2
      ? data[filter].slice(1, len - 1).map((x) => [x.latitude, x.longitude])
      : null;

  const route = locationInfo?.map((x) => x.join(",")).join("|");

  return (
    <div>
      <p className="text-neutral-500 text-3xl mb-4">여행 계획 안내</p>
      <p className="text-xl mt-8">여행일자</p>
      {Array.from({ length: data.length }, (_, i) => (
        <Button key={i} onClick={() => setFilter(i)} active={filter === i}>
          {i + 1}일차
        </Button>
      ))}
      <br />
      <p className="text-xl mt-8">교통수단</p>
      {Object.keys(TRANSPORTATION_TYPE).map((x, index) => (
        <Button
          key={index}
          onClick={() => setTransportation(x)}
          active={transportation === x}
        >
          {Object.values(TRANSPORTATION_TYPE)[index]}
        </Button>
      ))}
      <div className="flex mt-10">
        <div className="leading-10 text-lg">
          {data[filter]?.map((el) => {
            return (
              <div key={el.id}>
                <span className="mr-6 text-gray w-10 inline-block">
                  {el.time}시
                </span>
                <span>{el.name}</span>
              </div>
            );
          })}
        </div>
        <Wrapper>
          <iframe
            className="ml-48"
            width="550px"
            height="500px"
            src={`https://www.google.com/maps/embed/v1/directions?key=${
              import.meta.env.VITE_GOOGLE_KEY
            }&origin=${data[filter][0].latitude},${
              data[filter][0].longitude
            }&destination=${data[filter][len - 1].latitude},${
              data[filter][len - 1].longitude
            }&zoom=13${
              route ? `&waypoints=${route}` : ""
            }&mode=${transportation}`}
          />
        </Wrapper>
      </div>
    </div>
  );
};

export default Route;
