import Hotel from "../components/travel/Hotel";
import logo from "/logo-green.png";
import Flight from "../components/travel/Flight";
import Route from "../components/travel/Route";
import Detail from "../components/travel/Detail";
import { useQuery } from "@tanstack/react-query";
import { travel } from "../services/travel";
import { LOCATION } from "../constants/location";

const Travel = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["travel_plan"],
    queryFn: travel,
    select: (data) => data?.data?.response,
  });

  if (isLoading) console.log("isLoading...");
  if (data) console.log(data);

  const goHome = () => {
    window.location.href = "/";
  };

  const depart = Object.keys(LOCATION).find(
    (key) => LOCATION[key] === data?.flightList[0].region
  );

  const arrive = Object.keys(LOCATION).find(
    (key) => LOCATION[key] === data?.flightList[1].region
  );

  return (
    <>
      <div className="p-12">
        <img src={logo} className="w-40 cursor-pointer" onClick={goHome} />
      </div>
      <div className="px-24 text-4xl text-green">
        출발지는 <b>{depart}</b>, 도착지는 <b>{arrive}</b>입니다.
      </div>
      <Hotel data={data.hotel} />
      <Flight data={data.flightList} />
      <Route data={data.placeList} />
      <Detail data={data.placeList} />
    </>
  );
};

export default Travel;
