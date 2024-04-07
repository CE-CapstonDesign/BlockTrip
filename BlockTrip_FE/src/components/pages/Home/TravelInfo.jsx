import info from "/info.png";
import { useFormContext } from "react-hook-form";
import Title from "@/components/features/ui/Title";
import Input from "@/components/features/ui/Input";
import Label from "@/components/features/ui/Label";
import SelectInput from "@/components/features/ui/SelectInput";
import { LOCATION } from "@/constants/location";
import { useState } from "react";
import Button from "@/components/features/ui/Button";

const TravelInfo = () => {
  const { register } = useFormContext();
  const [showDepart, setShowDepart] = useState(false);
  const [showDestination, setShowDestination] = useState(false);

  return (
    <div>
      <Title src={info}>여행 정보</Title>
      <section className="flex items-center [&_article]:mr-20">
        <article>
          <Label htmlFor="departures">출발지</Label>
          <SelectInput
            id="departures"
            name="departures"
            setDefault={true}
            register={register("depart")}
            list={Object.keys(LOCATION)}
          />
          <div className="h-10">
            <Button
              className="block my-5"
              active={showDepart}
              onClick={() => setShowDepart((prev) => !prev)}
            >
              직접입력
            </Button>
            {showDepart && (
              <Input className="block" placeholder="출발지를 입력하세요." />
            )}
          </div>
        </article>

        <article>
          <Label htmlFor="arrivals">도착지</Label>
          <SelectInput
            id="arrivals"
            name="arrivals"
            setDefault={true}
            register={register("destinationLocation")}
            list={Object.keys(LOCATION)}
          />
          <div className="h-10">
            <Button
              className="block my-5"
              active={showDestination}
              onClick={() => setShowDestination((prev) => !prev)}
            >
              직접입력
            </Button>
            {showDestination && (
              <Input className="block" placeholder="도착지를 입력하세요." />
            )}
          </div>
        </article>

        <article className="mb-20">
          <Label htmlFor="schedule">여행일정</Label>
          <Input
            type="date"
            name="departureDate"
            placeholder="2023/11/24"
            register={register("departureDate")}
          />
          <span className="text-xl mx-10">~</span>
          <Input
            type="date"
            name="arrivalDate"
            placeholder="2023/11/30"
            register={register("arrivalDate")}
          />
        </article>
      </section>
    </div>
  );
};

export default TravelInfo;
