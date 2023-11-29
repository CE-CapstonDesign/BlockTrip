import Button from "../common/Button";
import Label from "../common/Label";
import Title from "../common/Title";
import interest from "/interest.png";

const Food = () => {
  return (
    <div>
      <Title src={interest}>음식</Title>
      <div className="flex items-center">
        <div className="mr-20">
          <Label htmlFor="departures">선호하는</Label>
          <div className="w-[24rem]">
            <Button>비건</Button>
            <Button>비건</Button>
            <Button>비건</Button>
            <Button>비건</Button>
            <Button>직접입력</Button>
          </div>
        </div>

        <div className="mr-20">
          <Label htmlFor="departures">카테고리</Label>
          <div className="w-[24rem]">
            <Button>브런치</Button>
            <Button>한식</Button>
            <Button>패스트푸드</Button>
            <Button>디저트</Button>
            <Button>직접입력</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
