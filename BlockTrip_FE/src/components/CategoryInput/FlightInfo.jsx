import { useState } from "react";
import { FLIGHT_METHOD, SEAT } from "../../constants/flight";
import Counter from "../common/Counter";
import Label from "../common/Label";
import SelectInput from "../common/SelectInput";
import Title from "../common/Title";
import flight from "/flight.png";
import ToogleBtn from "../common/ToggleBtn";
import { useFormContext, Controller } from "react-hook-form";

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
    <>
      <div className="flex items-start">
        <Title src={flight}>항공권</Title>
        <Controller
          control={control}
          name="flighttype"
          render={({ field: { onChange } }) => (
            <ToogleBtn
              checked={isRoundtrip}
              onChange={() => {
                handleToggleFlightMethod();
                onChange(method);
              }}
              value={method}
            />
          )}
        />
      </div>

      <div className="flex items-start">
        <div className="mr-20">
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

        <div className="mr-20">
          <Label htmlFor="departures">좌석</Label>
          <SelectInput
            id="departures"
            name="class"
            list={Object.keys(SEAT)}
            register={register("class")}
          />
        </div>
      </div>
    </>
  );
};

export default FlightInfo;
