import interest from "/interest.png";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { INTEREST, STYLE } from "@/constants/taste";
import { Button, Label, Title } from "@/components/features/ui";

const TasteInfo = () => {
  const { setValue } = useFormContext();

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

  return (
    <div>
      <Title src={interest} alt="interest icon">
        여행 스타일
      </Title>
      <section className="flex items-center [&_article]:mr-20">
        <article>
          <Label>여행 스타일</Label>
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
        </article>

        <article>
          <Label>관심있는</Label>
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
        </article>
      </section>
    </div>
  );
};

export default TasteInfo;
