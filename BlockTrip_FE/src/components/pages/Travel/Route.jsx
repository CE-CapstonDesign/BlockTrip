import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useState } from "react";
import { Button } from "@/components/features/ui";
import { setKey, setLanguage } from "react-geocode";
import { TRANSPORTATION_TYPE } from "@/constants/location";
import { Date } from "@/components/features/ui/Date";

setKey(import.meta.env.VITE_GOOGLE_KEY);
setLanguage("en");

const Route = ({ data }) => {
  const basicTransportation = Object.keys(TRANSPORTATION_TYPE)[0];
  const [filter, setFilter] = useState(0);
  const [transportation, setTransportation] = useState(basicTransportation);

  const len = data[filter].length;

  const locationInfo =
    len > 2
      ? data[filter].slice(1, len - 1).map((x) => [x.latitude, x.longitude])
      : null;

  const route = locationInfo?.join("|");

  useEffect(() => {
    setTransportation(basicTransportation);
  }, [filter]);

  return (
    <div>
      <p className="text-neutral-500 text-3xl mb-4">여행 계획 안내</p>
      <Date data={data} filter={filter} onClick={setFilter} />
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
          {data[filter]?.map((el, idx) => {
            return (
              <div key={`${idx}-${el.latitude}`}>
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
            width="670px"
            height="670px"
            src={`https://www.google.com/maps/embed/v1/directions?key=${
              import.meta.env.VITE_GOOGLE_KEY
            }&origin=${data[filter][0]?.latitude},${
              data[filter][0]?.longitude
            }&destination=${data[filter][len - 1]?.latitude},${
              data[filter][len - 1]?.longitude
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
