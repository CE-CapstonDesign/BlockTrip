import { useState } from "react";
import flight from "/flight.png";
import { useFormContext, Controller } from "react-hook-form";
import Counter from "@/components/features/ui/Counter";
import Label from "@/components/features/ui/Label";
import SelectInput from "@/components/features/ui/SelectInput";
import Title from "@/components/features/ui/Title";
import ToggleBtn from "@/components/features/ui/ToggleBtn";
import { FLIGHT_METHOD, SEAT } from "@/constants/flight";

const FlightInfo = () => {
  const { register, control } = useFormContext();

  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [baby, setBaby] = useState(0);
  const [method, setMethod] = useState(FLIGHT_METHOD.ONEWAY);
  const isRoundtrip = method === FLIGHT_METHOD.ROUNDTRIP;

  const onAdultChange = (newNumber) => {
    if (adult + child < 9) setAdult(newNumber);
  };

  const onChildChange = (newNumber) => {
    if (adult + child < 9) setChild(newNumber);
  };

  const onBabyChange = (newNumber) => {
    if (adult > baby) setBaby(newNumber);
  };

  const handleToggleFlightMethod = () => {
    method === FLIGHT_METHOD.ONEWAY
      ? setMethod(FLIGHT_METHOD.ROUNDTRIP)
      : setMethod(FLIGHT_METHOD.ONEWAY);
  };

  return (
    <section className="[&_article]:flex [&_article]:items-start">
      <article>
        <Title src={flight}>항공권</Title>
        <Controller
          control={control}
          name="flighttype"
          render={({ field: { onChange } }) => (
            <ToggleBtn
              checked={isRoundtrip}
              onChange={() => {
                handleToggleFlightMethod();
                onChange(method);
              }}
              value={method}
            />
          )}
        />
      </article>

      <article className="[&>div]:mr-20">
        <div>
          <Controller
            control={control}
            name="adult"
            render={({ field: { onChange } }) => (
              <Counter
                section="성인"
                description="만 12세 이상"
                min="1"
                max="9"
                value={adult}
                onNumberChange={(newNumber) => {
                  onAdultChange(newNumber);
                  onChange(newNumber);
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="child"
            render={({ field: { onChange } }) => (
              <Counter
                section="어린이"
                description="만 2~11세"
                min="1"
                max="9"
                value={child}
                onNumberChange={(newNumber) => {
                  onChildChange(newNumber);
                  onChange(newNumber);
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="babyqty"
            render={({ field: { onChange } }) => (
              <Counter
                section="유아"
                description="생후 14일~만 1세"
                min="1"
                max="9"
                value={baby}
                onNumberChange={(newNumber) => {
                  onBabyChange(newNumber);
                  onChange(newNumber);
                }}
              />
            )}
          />
        </div>

        <div>
          <Label htmlFor="departures">좌석</Label>
          <SelectInput
            id="departures"
            name="class"
            list={Object.keys(SEAT)}
            register={register("class")}
          />
        </div>
      </article>
    </section>
  );
};

export default FlightInfo;
