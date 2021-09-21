import React from "react";
import "./style.scss";
const Box: React.FC = ({ children }) => {
  return <div className="box-layout">{children}</div>;
};

export default Box;
