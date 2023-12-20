import instance from "./index";

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
