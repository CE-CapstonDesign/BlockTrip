import { Date } from "@/components/features/ui/Date";
// import { info } from "@/services/travel";
import { selectedItem } from "@/style/selectedItem";
import { Wrapper } from "@googlemaps/react-wrapper";
// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Detail = ({ data }) => {
  const [filter, setFilter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  //   const { data: infoData } = useQuery({ queryKey: ["info"], queryFn: info });
  //   console.log(infoData);

  return (
    <div>
      <p className="text-neutral-500 text-3xl mb-10">여행장소 상세</p>
      <Date data={data} filter={filter} onClick={setFilter} />
      <ul className="flex gap-10 overflow-auto mt-10">
        {data[filter].map((el, idx) => {
          return (
            <li
              key={`${idx}-${el.latitude}`}
              className={`cursor-pointer ${selectedItem(selectedIndex, idx)}`}
              onClick={() => setSelectedIndex(idx)}
            >
              {el.name}
            </li>
          );
        })}
      </ul>
      <p className="mt-10 text-xl">{data[filter][selectedIndex].name}</p>
      <Wrapper>
        <iframe
          width="1000px"
          height="450px"
          className="mt-10 mb-10"
          src={`https://www.google.com/maps/embed/v1/place?q=${
            data[filter][selectedIndex].latitude
          }, ${data[filter][selectedIndex].longitude}&key=${
            import.meta.env.VITE_GOOGLE_KEY
          }`}
        ></iframe>
      </Wrapper>
    </div>
  );
};

export default Detail;
