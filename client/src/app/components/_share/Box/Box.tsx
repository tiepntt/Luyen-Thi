import React from "react";
import "./style.scss";
const BoxApp: React.FC = ({ children }) => {
  return <div className="box-layout">{children}</div>;
};

export default BoxApp;
