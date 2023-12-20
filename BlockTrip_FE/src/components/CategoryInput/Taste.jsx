import { STYLE, INTEREST } from "../../constants/taste";
import Button from "../common/Button";
import Label from "../common/Label";
import Title from "../common/Title";
import interest from "/interest.png";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const Taste = () => {
  const { register, setValue } = useFormContext();

  const [interests, setInterests] = useState([]);
  const [style, setStyle] = useState([]);

  const handleInterests = (el) => {
    if (interests.includes(el)) {
      const newInterests = interests.filter((button) => button !== el);
      setInterests(newInterests);
      setValue("interests", newInterests);
    } else {
      const newInterests = [...interests, el];
      setInterests(newInterests);
      setValue("interests", newInterests);
    }
  };

  const handleStyle = (el) => {
    if (style.includes(el)) {
      const newStyle = style.filter((button) => button !== el);
      setStyle(newStyle);
      setValue("travelStyle", newStyle);
    } else {
      const newStyle = [...style, el];
      setStyle(newStyle);
      setValue("travelStyle", newStyle);
    }
  };

  useEffect(() => {
    register("interests");
    register("travelStyle");
  }, [register]);

  return (
    <div>
      <Title src={interest}>여행 스타일</Title>
      <div className="flex items-center">
        <div className="mr-20">
          <Label htmlFor="departures">여행 스타일</Label>
          <div className="w-[26rem]">
            {STYLE.map((el, idx) => (
              <Button
                key={idx}
                onClick={() => handleInterests(el)}
                active={interests.includes(el)}
              >
                {el}
              </Button>
            ))}
          </div>
        </div>

        <div className="mr-20">
          <Label htmlFor="departures">관심있는</Label>
          <div className="w-[26rem]">
            {INTEREST.map((el, idx) => (
              <Button
                key={idx}
                onClick={() => handleStyle(el)}
                active={style.includes(el)}
              >
                {el}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taste;
