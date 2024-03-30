import { useNavigate } from "react-router-dom";
import logo from "/logo-green.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <img
      src={logo}
      className="w-40 cursor-pointer m-12"
      onClick={() => navigate("/")}
      alt="logo"
    />
  );
};

export default Header;
