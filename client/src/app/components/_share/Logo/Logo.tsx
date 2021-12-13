import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
const Logo = () => {
  return (
    <NavLink className="app-logo pb-2" to="/">
      iPractice
    </NavLink>
  );
};

export default Logo;
