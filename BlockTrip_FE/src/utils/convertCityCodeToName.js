import { LOCATION } from "@/constants/location";

export const convertCityCodeToName = (data, travelType) => {
  const travelTypeNum = travelType === "depart" ? 0 : 1;
  const tripRegion = data?.flightList[travelTypeNum].region;
  const isExistLocation = Object.values(LOCATION).includes(tripRegion);

  if (isExistLocation) {
    return Object.keys(LOCATION).find((key) => LOCATION[key] === tripRegion);
  } else {
    return data.flightList[travelTypeNum].region;
  }
};
