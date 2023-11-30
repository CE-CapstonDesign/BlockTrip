import Title from "../common/Title";
import Input from "../common/Input";
import Label from "../common/Label";
import SelectInput from "../common/SelectInput";
import info from "/info.png";

const TravelInfo = ({ id }) => {
  return (
    <div id={id}>
      <Title src={info}>여행 정보</Title>
      <div className="flex items-center">
        <div className="mr-20">
          <Label htmlFor="departures">출발지</Label>
          <SelectInput id="departures" name="departures" />
        </div>

        <div className="mr-20">
          <Label htmlFor="arrivals">도착지</Label>
          <SelectInput id="arrivals" name="arrivals" />
        </div>

        <div className="mr-20">
          <Label htmlFor="schedule" className="mb-[16.999992px]">
            여행일정
          </Label>
          <Input type="date" name="schdule" placeholder="2023/11/24" />
          <span className="text-xl mx-10">~</span>
          <Input type="date" name="schdule-1" placeholder="2023/11/30" />
        </div>
      </div>
    </div>
  );
};

export default TravelInfo;
