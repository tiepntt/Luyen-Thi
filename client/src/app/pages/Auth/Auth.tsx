import ActiveAccountModal from "app/components/_share/Modals/ActiveAccountModal/ActiveAccountModal";
import { UserRedux } from "models/user/userInfo";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { AppCommon } from "redux/common/reducer";
import { RootState } from "redux/store";
import { UserFunction } from "redux/user/action";
import { history } from "services/history";
import Login from "./Login/Login";
import Register from "./Register/Register";

const AuthPage = (props: any) => {
  const [showActiveModal, setShowActiveModal] = useState(false);
  const commonState = useSelector<RootState, AppCommon>(
    (root: RootState) => root.CommonReducer
  );
  const userRedux = useSelector<RootState, UserRedux>(
    (root: RootState) => root.UserReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (userRedux.userInfo && !userRedux.userInfo.emailConfirmed) {
      // popup vetify email code
      setShowActiveModal(true);
    }
    if (userRedux.userInfo && userRedux.userInfo.emailConfirmed) {
      // popup vetify email code
      history.push(commonState.redirectPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRedux]);
  const activeAccount = () => {
    dispatch(UserFunction.activeAccount());
  };
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
      <ActiveAccountModal
        show={showActiveModal}
        setShow={setShowActiveModal}
        user={userRedux.userInfo}
        onActive={activeAccount}
      />
    </Container>
  );
};

export default AuthPage;
