import Input from "../common/Input";
import Label from "../common/Label";
import SelectInput from "../common/SelectInput";
import Title from "../common/Title";
import hotel from "/hotel.png";

const HotelInfo = () => {
  return (
    <div>
      <Title src={hotel}>숙박</Title>
      <div className="flex items-center">
        <div className="mr-20">
          <Label htmlFor="departures">정렬</Label>
          <SelectInput id="departures" name="departures" />
        </div>

        <div className="mr-20">
          <Label htmlFor="people">방 개수</Label>
          <Input type="number" name="people" className="w-10" />
          <span>개</span>
        </div>
      </div>
    </div>
  );
};

export default HotelInfo;
