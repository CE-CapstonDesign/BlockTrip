import axios from "axios";
import { instance } from "./index";

export const travelPlan = (data) => {
  return instance.post("/travel/plan", data);
};

export const travel = () => {
  return instance.get("/travel/plan", { timeout: 1000000 });
};

export const info = async (placeId) => {
  return await axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&language=ko&key=${
      import.meta.env.VITE_GOOGLE_KEY
    }`,
    {
      withCredentials: false,
    }
  );
};
