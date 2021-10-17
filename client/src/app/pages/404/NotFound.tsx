import React from "react";
import { useHistory } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <div style={{ alignItems: "center" }}>
      <div
        style={{
          textAlign: "center",
          color: "black",
          fontSize: "10rem",
          fontWeight: "bold",
          marginTop: "20vh",
        }}
      >
        404
      </div>
      <div
        style={{
          textAlign: "center",
          color: "black",
          fontSize: "2.2rem",
          marginTop: "10px",
        }}
      >
        Not Found
      </div>
      <div
        style={{
          textAlign: "center",
          color: "black",
          fontSize: "1.4rem",
          marginTop: "10px",
        }}
      >
        The resource requested could not be found on this server!
      </div>
      <div
        style={{
          marginTop: "35px",
          textAlign:"center"
        }}
      >
        <button
          type="button"
          onClick={handleClick}
          style={{
            borderRadius: "16px",
            border: "none",
            fontWeight: "bold",
            padding: "5px 15px",
            backgroundColor: "green",
            color: "white",
            fontSize: "1.8rem",
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
