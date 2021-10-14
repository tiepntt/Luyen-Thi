import React, { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

const AuthPage = (props: any) => {
  const [haveAccount, setHaveAccount] = useState(true);
  return (
    <div>
      {haveAccount ? (
        <Login
          onHide={props.onHide}
          onMoveToRegister={() => setHaveAccount(false)}
        />
      ) : (
        <Register onMoveToLogin={() => setHaveAccount(true)} />
      )}
    </div>
  );
};

export default AuthPage;
