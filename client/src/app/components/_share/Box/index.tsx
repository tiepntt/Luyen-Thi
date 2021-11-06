import React from "react";
import "./style.scss";
interface Props {
  className?: string;
  id?: string;
}
const BoxApp: React.FC<Props> = (props) => {
  return <div className="box-layout" {...props}></div>;
};

export default BoxApp;
