import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useState } from "react";
import Button from "@/components/features/ui/Button";
import { setKey, setLanguage, setRegion } from "react-geocode";
import { TRANSPORTATION_TYPE } from "@/constants/location";
import { getAddressFromLatLng } from "@/utils/getAddressFromLatLng";

setKey(import.meta.env.VITE_GOOGLE_KEY);
setLanguage("en");
setRegion("es");

const Route = ({ data }) => {
  const [filter, setFilter] = useState(0);
  const [transportation, setTransportation] = useState("transit");
  const [travelRoute, setTravelRoute] = useState([]);
  const [terminal, setTerminal] = useState([]);

  const name = data[filter].flatMap((x) => x.name.replace("&", ""));
  const len = name.length;

  useEffect(() => {
    const getTerminal = async () => {
      const origin = await getAddressFromLatLng(
        data[filter][0].latitude,
        data[filter][0].longitude
      );

      const destination = await getAddressFromLatLng(
        data[filter][len - 1].latitude,
        data[filter][len - 1].longitude
      );
      setTerminal([
        origin.replaceAll(" ", "+"),
        destination.replaceAll(" ", "+"),
      ]);
    };

    getTerminal();
  }, [data, filter, len]);

  useEffect(() => {
    const getAddress = async () => {
      const promises = data[filter].map(async (item) => {
        const dayTravelRoute = await getAddressFromLatLng(
          item.latitude,
          item.longitude
        );
        return dayTravelRoute;
      });

      const allTravelRoutes = await Promise.all(promises);
      setTravelRoute(allTravelRoutes);
    };

    getAddress();
  }, [data, filter]);

  // TODO: 지원안되는 교통수단 빼기
  const route = travelRoute.slice(1, len - 1).join("|");
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
            width="500px"
            height="500px"
            src={`https://www.google.com/maps/embed/v1/directions?key=${
              import.meta.env.VITE_GOOGLE_KEY
            }&origin=${data[filter][0].latitude},${
              data[filter][0].longitude
            }&destination=${data[filter][len - 1].latitude},${
              data[filter][len - 1].longitude
            }&zoom=13&mode=${transportation}`}
          />
        </Wrapper>
      </div>
    </div>
  );
};

export default Route;
