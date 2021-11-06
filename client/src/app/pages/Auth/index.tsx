import ActiveAccountModal from "app/components/_share/Modals/ActiveAccountModal";
import Loading from "app/components/_share/StaticLayout/Loading";
import { useAppContext } from "hooks/AppContext";
import { UserRedux } from "models/user/userInfo";
import React, { useEffect, useState, Suspense } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router";
import { RootState } from "redux/store";
import { UserFunction } from "redux/user/action";
import "./style.scss";
const ChangePassword = React.lazy(
  () => import("./ChangePassword")
);
const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));

const AuthPage = (props: any) => {
  const [showActiveModal, setShowActiveModal] = useState(false);
  const userRedux = useSelector<RootState, UserRedux>(
    (root: RootState) => root.UserReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (userRedux.userInfo && !userRedux.userInfo.emailConfirmed) {
      // popup vetify email code
      setShowActiveModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRedux]);
  const activeAccount = () => {
    dispatch(UserFunction.activeAccount());
  };
  const location = useLocation();
  const { scrollTop } = useAppContext();
  useEffect(() => {
    scrollTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return (
    <Container className="auth-page">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/auth/login" exact>
            <Login />
          </Route>
          <Route path="/auth/register" exact>
            <Register />
          </Route>
          <Route path="/auth/change-password" exact>
            <ChangePassword />
          </Route>
        </Switch>
        <ActiveAccountModal
          show={showActiveModal}
          setShow={setShowActiveModal}
          user={userRedux.userInfo}
          onActive={activeAccount}
        />
      </Suspense>
    </Container>
  );
};

export default AuthPage;
