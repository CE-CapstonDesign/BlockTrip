import info from "/info.png";
import { useFormContext } from "react-hook-form";
import {
  Title,
  Input,
  Label,
  SelectInput,
  Button,
} from "@/components/features/ui";
import { LOCATION } from "@/constants/location";
import { useEffect, useState } from "react";

const TravelInfo = () => {
  const { register, setValue } = useFormContext();
  const [showDepart, setShowDepart] = useState(false);
  const [showDestination, setShowDestination] = useState(false);
  const [depart, setDepart] = useState("");
  const [inputDepart, setInputDepart] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    if (inputDepart !== "") {
      setValue("depart", inputDepart);
    } else {
      setValue("depart", LOCATION[depart]);
    }

    setValue("destinationLocation", destination);
    if (Object.keys(LOCATION).includes(destination)) {
      setValue("airportDestination", LOCATION[destination]);
    }
  }, [depart, destination, inputDepart, setValue]);

  return (
    <div>
      <Title src={info} alt="travel icon">
        여행 정보
      </Title>
      <section className="flex items-center [&_article]:mr-20">
        <article>
          <Label htmlFor="departures">출발지</Label>
          <SelectInput
            id="departures"
            setDefault={true}
            onChange={(e) => setDepart(e.target.value)}
            list={Object.keys(LOCATION).sort()}
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
              <Input
                id="departures"
                onChange={(e) => setInputDepart(e.target.value)}
                className="block"
                placeholder="출발지를 입력하세요."
              />
            )}
          </div>
        </article>

        <article>
          <Label htmlFor="arrivals">도착지</Label>
          <SelectInput
            id="arrivals"
            setDefault={true}
            onChange={(e) => setDestination(e.target.value)}
            list={Object.keys(LOCATION).sort()}
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
              <Input
                onChange={(e) => setDestination(e.target.value)}
                className="block"
                placeholder="도착지를 입력하세요."
              />
            )}
          </div>
        </article>

        <article className="mb-20">
          <Label htmlFor="schedule">여행일정</Label>
          <Input
            id="schedule"
            type="date"
            name="departureDate"
            register={register("departureDate")}
          />
          <span className="text-xl mx-10">~</span>
          <Input
            type="date"
            name="arrivalDate"
            register={register("arrivalDate")}
          />
        </article>
      </section>
    </div>
  );
};

export default TravelInfo;
