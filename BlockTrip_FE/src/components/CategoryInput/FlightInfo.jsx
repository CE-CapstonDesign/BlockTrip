import Input from "../common/Input";
import Label from "../common/Label";
import SelectInput from "../common/SelectInput";
import Title from "../common/Title";
import flight from "/flight.png";

const FlightInfo = () => {
  return (
    <div>
      <Title src={flight}>항공권</Title>
      <div className="flex items-center">
        <div className="mr-20">
          <Label htmlFor="departures">좌석</Label>
          <SelectInput id="departures" name="departures" />
        </div>

        <div className="mr-20">
          <Label htmlFor="people">인원수</Label>
          <span className="mr-4">성인</span>
          <Input type="number" name="people" className="w-10 mr-10" />
          <span className="mr-4">어린이</span>
          <Input type="number" name="child" className="w-10 mr-10" />
          <span className="mr-4">신생아</span>
          <Input type="number" name="baby" className="w-10 mr-10" />
        </div>
      </div>
    </div>
  );
};

export default FlightInfo;
