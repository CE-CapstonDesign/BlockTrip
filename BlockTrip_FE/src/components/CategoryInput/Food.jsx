import { useState, useEffect } from "react";
import { RESTAURANT, FOOD } from "../../constants/food";
import Button from "../common/Button";
import Label from "../common/Label";
import Title from "../common/Title";
import interest from "/interest.png";
import { useFormContext } from "react-hook-form";

const Food = () => {
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
      <div className="flex items-center">
        <div className="mr-20">
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
        </div>

        <div className="mr-20">
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
        </div>
      </div>
    </div>
  );
};

export default Food;
