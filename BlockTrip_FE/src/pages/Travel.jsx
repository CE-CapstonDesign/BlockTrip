import Hotel from "../components/travel/Hotel";
import logo from "/logo-green.png";
import { data } from "../mock/data";
import Flight from "../components/travel/Flight";
import Route from "../components/travel/Route";
import Detail from "../components/travel/Detail";

const Travel = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div className="p-12">
        <img src={logo} className="w-40 cursor-pointer" onClick={goHome} />
      </div>
      <Hotel data={data} />
      <Flight data={data} />
      <Route data={data} />
      <Detail data={data} />
    </>
  );
};

export default Travel;
