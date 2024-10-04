import React, { useEffect } from "react";
import Navbar from "../pages/Auth/Navbar";
import { useLocation } from "react-router";

const Header = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Header;
