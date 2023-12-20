import { Wrapper } from "@googlemaps/react-wrapper";
import { useState } from "react";
import Button from "../common/Button";

const Route = ({ data }) => {
  const [filter, setFilter] = useState(0);

  const handleOnClick = (el) => {
    setFilter(el);
  };

  const name = data[filter].flatMap((x) => x.name);
  const len = name.length;
  const route = name.slice(1, len - 2).join("|");
  console.log(name);

  return (
    <div className="py-12 px-24">
      <p className="text-neutral-500 text-3xl mb-4">여행 계획 안내</p>
      {Array.from({ length: data.length }, (_, i) => (
        <Button key={i} onClick={() => handleOnClick(i)} active={filter === i}>
          {i + 1}일차
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
            }&origin=${name[0]}&waypoints=${route}&destination=${
              name[len - 1]
            }&mode=driving&zoom=13`}
          />
        </Wrapper>
      </div>
    </div>
  );
};

export default Route;
