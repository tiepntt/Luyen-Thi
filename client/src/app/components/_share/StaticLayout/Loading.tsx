import React from "react";
import Spinner from "./Spinner";
interface Props {
  size?: "normal" | "sm";
  showLabel?: boolean;
}
const Loading: React.FC<Props> = ({ showLabel = true, size = "normal" }) => {
  return (
    <div className="text-center m-auto pt-3">
      <div className="content-loader">
        <Spinner size={size} />
        {showLabel && <div className="loadding-text">Đang tải dữ liệu</div>}
      </div>
    </div>
  );
};

export default Loading;
