import { LOCATION } from "@/constants/location";

export const convertCityCodeToName = (data, travelType) => {
  const travelTypeNum = travelType === "depart" ? 0 : 1;

  return Object.keys(LOCATION).find(
    (key) => LOCATION[key] === data?.flightList[travelTypeNum].region
  );
};
