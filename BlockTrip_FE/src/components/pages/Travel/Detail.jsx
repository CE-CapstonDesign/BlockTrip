import { Date } from "@/components/features/ui/Date";
import { info } from "@/services/travel";
import { selectedItem } from "@/style/selectedItem";
import { getPlaceId } from "@/utils/geocode";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PlaceInfo } from "./PlaceInfo";

const Detail = ({ data }) => {
  const [filter, setFilter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [placeId, setPlaceId] = useState("");

  const getPlaceIdFromLatLng = async () => {
    const placeId = await getPlaceId(
      data[filter][selectedIndex]?.latitude,
      data[filter][selectedIndex]?.longitude
    );
    setPlaceId(placeId);
  };

  useEffect(() => {
    getPlaceIdFromLatLng();
  }, [selectedIndex, filter]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filter]);

  const { data: infoData } = useQuery({
    queryKey: ["info", placeId],
    queryFn: () => info(placeId),
    select: (data) => data?.data.result,
  });

  const ignoredTypes = ["establishment", "premise", "street_address"];

  const types = infoData?.types
    .slice(0, 3)
    .filter((x) => !ignoredTypes.includes(x));

  return (
    <div>
      <p className="text-neutral-500 text-3xl mb-10">여행장소 상세</p>
      <Date data={data} filter={filter} onClick={setFilter} />
      <div className="flex gap-24 mt-10">
        <ul className="[&_li]:cursor-pointer">
          {data[filter]?.map((el, idx) => {
            return (
              <li
                key={`${idx}-${el.latitude}`}
                className={selectedItem(selectedIndex, idx)}
                onClick={() => setSelectedIndex(idx)}
              >
                {el.name}
              </li>
            );
          })}
        </ul>
        <div>
          <article className="flex items-center">
            <h4 className="text-2xl font-bold mr-4">
              {data[filter][selectedIndex]?.name}
            </h4>
            {infoData?.rating && (
              <span className="text-lg">★ {infoData?.rating}</span>
            )}
          </article>
          <p className="text-xl text-slate-700 mt-2">
            {infoData?.editorial_summary?.overview}
          </p>
          <p className="mt-3 flex gap-4 text-slate-500 text-lg">
            {types?.map((x, idx) => (
              <span key={idx}># {x}</span>
            ))}
          </p>
          <div className="mt-10 [&>*]:leading-10">
            <PlaceInfo data={infoData?.formatted_address}>주소</PlaceInfo>
            <PlaceInfo data={infoData?.formatted_phone_number}>
              전화번호
            </PlaceInfo>
            <PlaceInfo id="link" data={infoData?.website}>
              웹사이트
            </PlaceInfo>
            <PlaceInfo data={infoData?.current_opening_hours?.weekday_text}>
              운영시간
            </PlaceInfo>
          </div>
          <Wrapper>
            <iframe
              width="1000px"
              height="450px"
              className="mt-10 mb-10"
              src={`https://www.google.com/maps/embed/v1/place?q=${
                data[filter][selectedIndex]?.latitude
              }, ${data[filter][selectedIndex]?.longitude}&key=${
                import.meta.env.VITE_GOOGLE_KEY
              }`}
            ></iframe>
          </Wrapper>
        </div>
      </div>
    </div>
  );
};

export default Detail;
