import Hotel from "./Hotel";
import Flight from "./Flight";
import Route from "./Route";
import Detail from "./Detail";
import { useQuery } from "@tanstack/react-query";
import { travel } from "@/services/travel";
import Header from "@/components/features/ui/Header";
// import { data } from "@/mock/data";
import { convertCityCodeToName } from "@/utils/convertCityCodeToName";

export const Travel = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["travel_plan"],
    queryFn: travel,
    select: (data) => data?.data?.response,
  });

  if (isLoading) console.log("isLoading...");
  if (data) console.log(data);

  const depart = convertCityCodeToName(data, "depart");
  const arrive = convertCityCodeToName(data, "arrive");

  return (
    <>
      <Header />
      <section className="px-36 mt-20">
        <div className="text-4xl text-green">
          출발지는 <b>{depart}</b>, 도착지는 <b>{arrive}</b>입니다.
        </div>
        <section className="[&>*]:py-12">
          <Hotel data={data.hotel} />
          <Flight data={data.flightList} />
          <Route data={data.placeList} />
          <Detail data={data.placeList} />
        </section>
      </section>
    </>
  );
};