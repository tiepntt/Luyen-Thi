import LoginForm from "app/components/_share/Form/LoginFrom/LoginForm";
import RegisterForm from "app/components/_share/Form/RegisterForm/RegisterForm";
import React from "react";
import { Container } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router";
import "./style.scss";
const AuthPage = () => {
  return (
    <Container className="h-100">
      <div className="auth-page">
        <Switch>
          <Route path="/auth/login" exact component={LoginForm} />
          <Route path="/auth/register" exact component={RegisterForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Container>
  );
};

export default AuthPage;
