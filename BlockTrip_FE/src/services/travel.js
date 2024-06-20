import axios from "axios";
import { instance } from "./index";

export const travelPlan = (data) => {
  return instance.post("/travel/plan", data);
};

export const travel = () => {
  return instance.get("/travel/plan", { timeout: 1000000 });
};

export const geocode = ({ latitude, longitude }) => {
  return instance.get(
    `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${
      import.meta.env.VITE_GOOGLE_KEY
    }`
  );
};

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJrTLr-GyuEmsRBfy61i59si0&fields=address_components&key=${
  import.meta.env.VITE_GOOGLE_KEY
}`;

export const info = async () => {
  return await axios.get(proxyurl + url, {
    withCredentials: true,
  });
};
