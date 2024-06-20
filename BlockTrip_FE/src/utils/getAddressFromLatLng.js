import { fromLatLng } from "react-geocode";

export const getAddressFromLatLng = async (lat, lng) => {
  const formattedAddress = await fromLatLng(lat, lng, "", "en").then(
    (response) => {
      const address = response.results[0].formatted_address;
      return address;
    },
    (error) => {
      console.log(error);
    }
  );
  return formattedAddress;
};
