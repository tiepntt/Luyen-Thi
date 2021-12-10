import React from "react";
import clsx from "clsx";
import "./style.scss";

interface Props {
  size?: "normal" | "sm";
}
const Spinner: React.FC<Props> = ({ size = "normal" }) => {
  return <div className={clsx("spinner-loading", size)}></div>;
};

export default Spinner;
