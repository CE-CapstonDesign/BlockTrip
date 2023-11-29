import TravelInfo from "../components/CategoryInput/TravelInfo";
import logoWhite from "/logo-white.png";
import title from "/title.png";
import downArrow from "/down-arrow.png";
import FlightInfo from "../components/CategoryInput/FlightInfo";
import HotelInfo from "../components/CategoryInput/HotelInfo";
import Taste from "../components/CategoryInput/Taste";
import Food from "../components/CategoryInput/Food";

const Home = () => {
  return (
    <div className="scroll-smooth overflow-y-auto">
      <div className="flex flex-col bg-cover bg-[url('/main.png')] h-screen">
        <div className="p-12">
          <img src={logoWhite} className="w-48" />
          <div className="flex flex-col justify-start pl-16 mx-0 my-72">
            <img src={title} className="w-[40rem]" />
            <a href="#travelInfo">
              <img src={downArrow} className="w-16 mt-10 cursor-pointer" />
            </a>
          </div>
        </div>
        <div className="px-56 py-24">
          <TravelInfo id="travelInfo" />
          <div className="mt-24">
            <FlightInfo />
          </div>
          <div className="mt-24">
            <HotelInfo />
          </div>
          <div className="mt-24">
            <Taste />
          </div>
          <div className="mt-24">
            <Food />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
