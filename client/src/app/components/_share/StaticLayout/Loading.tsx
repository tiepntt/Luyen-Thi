import React from "react";
import Spinner from "./Spinner";

const Loading = () => {
  return (
    <div className="text-center m-auto pt-3">
      <div className="content-loader">
        <Spinner />
        <div className="loadding-text">Đang tải dữ liệu</div>
      </div>
    </div>
  );
};

export default Loading;
