import { useState } from "react";
import hotel from "/hotel.png";
import { useFormContext, Controller } from "react-hook-form";
import { HOTEL, ROOM_LIMIT } from "@/constants/hotel";
import { Counter, Label, SelectInput, Title } from "@/components/features/ui";

const HotelInfo = () => {
  const { register, control } = useFormContext();

  const [number, setNumber] = useState(ROOM_LIMIT.MIN);

  const onNumberChange = (newNumber) => {
    setNumber(newNumber);
  };

  return (
    <div>
      <Title src={hotel} alt="hotel icon">
        숙박
      </Title>
      <section className="flex items-start [&_article]:mr-20">
        <article>
          <Label htmlFor="departures">정렬</Label>
          <SelectInput
            id="departures"
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
                min={ROOM_LIMIT.MIN}
                max={ROOM_LIMIT.MAX}
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
