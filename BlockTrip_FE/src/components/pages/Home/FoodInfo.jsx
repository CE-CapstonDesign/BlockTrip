import { useState, useEffect } from "react";
import interest from "/interest.png";
import { useFormContext } from "react-hook-form";
import Button from "@/components/features/ui/Button";
import Label from "@/components/features/ui/Label";
import Title from "@/components/features/ui/Title";
import { FOOD, RESTAURANT } from "@/constants/food";

const FoodInfo = () => {
  const { register, setValue } = useFormContext();

  const [prefer, setPrefer] = useState([]);
  const [category, setCategory] = useState([]);

  const handlePrefer = (el) => {
    if (prefer.includes(el)) {
      const newPrefer = prefer.filter((button) => button !== el);
      setPrefer(newPrefer);
      setValue("foodType", newPrefer);
    } else {
      const newPrefer = [...prefer, el];
      setPrefer(newPrefer);
      setValue("foodType", newPrefer);
    }
  };

  const handleCategory = (el) => {
    if (category.includes(el)) {
      const newCategory = category.filter((button) => button !== el);
      setCategory(newCategory);
      setValue("restaurantType", newCategory);
    } else {
      const newCategory = [...category, el];
      setCategory(newCategory);
      setValue("restaurantType", newCategory);
    }
  };

  useEffect(() => {
    register("restaurantType");
    register("foodType");
  }, [register]);

  return (
    <div>
      <Title src={interest}>음식</Title>
      <section className="flex items-center [&_article]:mr-20">
        <article>
          <Label htmlFor="departures">식품 종류</Label>
          <div className="w-[26rem]">
            {FOOD.map((el, idx) => (
              <Button
                key={idx}
                onClick={() => handlePrefer(el)}
                active={prefer.includes(el)}
              >
                {el}
              </Button>
            ))}
          </div>
        </article>

        <article>
          <Label htmlFor="departures">음식점 종류</Label>
          <div className="w-[28rem]">
            {RESTAURANT.map((el, idx) => (
              <Button
                key={idx}
                onClick={() => handleCategory(el)}
                active={category.includes(el)}
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

export default FoodInfo;
