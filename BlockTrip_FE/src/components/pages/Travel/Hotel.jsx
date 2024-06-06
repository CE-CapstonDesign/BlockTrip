import { useState } from "react";
import HotelInfo from "./HotelInfo";
import { Button } from "@/components/features/ui";

const Hotel = ({ data }) => {
  const [hotelIndex, setHotelIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState(
    new Array(data.length).fill(true)
  );

  const handleItemClick = (idx) => {
    setHotelIndex(idx);
    setSelectedIndex(idx);
  };

  const handleOnDelete = () => {
    if (selectedHotel.filter((x) => x === true).length === 1) {
      alert("숙소가 1개일 땐 삭제할 수 없습니다.");
      return;
    }

    const updatedSelectedHotel = [...selectedHotel];
    updatedSelectedHotel[hotelIndex] = false;
    setSelectedHotel(updatedSelectedHotel);

    const nextValidIndex = updatedSelectedHotel.findIndex(
      (selected) => selected
    );

    if (nextValidIndex !== -1) {
      handleItemClick(nextValidIndex);
    }
  };

  return (
    <div>
      <p className="text-neutral-500 text-3xl mb-8">숙박 정보</p>
      <div className="flex gap-24">
        <ul className="[&_li]:cursor-pointer">
          {data.map(
            (x, idx) =>
              selectedHotel[idx] && (
                <li
                  className={`truncate w-52 text-lg leading-10 hover:font-bold active:font-bold ${
                    selectedIndex === idx
                      ? "font-bold text-green"
                      : "font-light"
                  }`}
                  key={`${idx}-${x.latitude}`}
                  onClick={() => handleItemClick(idx)}
                >
                  {idx + 1}일차 <span className="ml-6">{x.name}</span>
                </li>
              )
          )}
        </ul>
        {selectedHotel[hotelIndex] && (
          <div className="flex flex-col">
            <HotelInfo
              location={data[hotelIndex].latitude}
              data={data}
              hotelIndex={hotelIndex}
            />
            <Button className="mt-6 w-32" onClick={handleOnDelete}>
              이 숙소 삭제
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotel;
