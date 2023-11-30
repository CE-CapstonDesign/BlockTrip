import Button from "../common/Button";
import Label from "../common/Label";
import Title from "../common/Title";
import interest from "/interest.png";

const Taste = () => {
  return (
    <div>
      <Title src={interest}>음식</Title>
      <div className="flex items-center">
        <div className="mr-20">
          <Label htmlFor="departures">여행 스타일</Label>
          <div className="w-[24rem]">
            <Button>모험</Button>
            <Button>도보</Button>
            <Button>체험</Button>
            <Button>자유로운</Button>
            <Button>직접입력</Button>
          </div>
        </div>

        <div className="mr-20">
          <Label htmlFor="departures">관심있는</Label>
          <div className="w-[24rem]">
            <Button>문화</Button>
            <Button>역사</Button>
            <Button>고급진</Button>
            <Button>현지</Button>
            <Button>직접입력</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taste;
