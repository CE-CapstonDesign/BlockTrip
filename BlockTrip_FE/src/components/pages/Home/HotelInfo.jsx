import { useState } from "react";
import hotel from "/hotel.png";
import { useFormContext, Controller } from "react-hook-form";
import { HOTEL } from "@/constants/hotel";
import Counter from "@/components/features/ui/Counter";
import Label from "@/components/features/ui/Label";
import SelectInput from "@/components/features/ui/SelectInput";
import Title from "@/components/features/ui/Title";

const HotelInfo = () => {
  const { register, control } = useFormContext();

  const [number, setNumber] = useState(1);

  const onNumberChange = (newNumber) => {
    setNumber(newNumber);
  };

  return (
    <div>
      <Title src={hotel}>숙박</Title>
      <section className="flex items-start [&_article]:mr-20">
        <article>
          <Label htmlFor="departures">정렬</Label>
          <SelectInput
            id="departures"
            name="departures"
            list={Object.keys(HOTEL)}
            register={register("sort")}
          />
        </article>

        <article>
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
        </article>
      </section>
    </div>
  );
};

export default HotelInfo;
