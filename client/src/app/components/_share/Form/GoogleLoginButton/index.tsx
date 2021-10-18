import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleLoginButton: React.FC = ({ children }) => {
  const responseGoogle = (response: any) => {
    console.log(response);
  };
  return (
    <GoogleLogin
      clientId="1031836054677-q8fg2l94a2hvpjjgplp163f4svp3qjgc.apps.googleusercontent.com"
      render={(renderProps) => <>{children}</>}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"https://localhost:44325/"}
    />
  );
};

export default GoogleLoginButton;
