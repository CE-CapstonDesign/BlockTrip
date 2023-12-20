import { useState } from "react";
import { HOTEL } from "../../constants/hotel";
import Counter from "../common/Counter";
import Label from "../common/Label";
import SelectInput from "../common/SelectInput";
import Title from "../common/Title";
import hotel from "/hotel.png";
import { useFormContext, Controller } from "react-hook-form";

const HotelInfo = () => {
  const { register, control } = useFormContext();

  const [number, setNumber] = useState(1);

  const onNumberChange = (newNumber) => {
    setNumber(newNumber);
  };

  return (
    <div>
      <Title src={hotel}>숙박</Title>
      <div className="flex items-start">
        <div className="mr-20">
          <Label htmlFor="departures">정렬</Label>
          <SelectInput
            id="departures"
            name="departures"
            list={Object.keys(HOTEL)}
            register={register("sort")}
          />
        </div>

        <div className="mr-20">
          <Label htmlFor="people">방 개수</Label>
          <Controller
            control={control}
            name="room"
            render={({ field: { onChange } }) => (
              <Counter
                min="1"
                max="8"
                value={number}
                onNumberChange={(newNumber) => {
                  onNumberChange(newNumber);
                  onChange(newNumber);
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelInfo;
