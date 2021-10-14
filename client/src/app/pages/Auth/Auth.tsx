import { UserRedux } from "models/user/userInfo";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { RootState } from "redux/store";
import { history } from "services/history";
import Login from "./Login/Login";
import Register from "./Register/Register";

const AuthPage = (props: any) => {
  const user = useSelector<RootState, UserRedux>(
    (root: RootState) => root.UserReducer
  );
  useEffect(() => {
    if (user && user.user) {
      history.push("/");
    }
  });
  return (
    <Container>
      <Switch>
        <Route path="/auth/login" exact>
          <Login />
        </Route>
        <Route path="/auth/register" exact>
          <Register />
        </Route>
      </Switch>
    </Container>
  );
};

export default AuthPage;
