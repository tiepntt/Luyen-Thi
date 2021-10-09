import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="loadding text-center m-auto pt-3">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loading;
