import { useAppContext } from "hooks/AppContext/AppContext";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";

import NotFoundPage from "./404/NotFound";
import AdminPage from "./Admin/Admin";
import DocumentPage from "./Document/Document";
import HomePage from "./Home/Home";
import ProfilePage from "./Profile/Profile";
interface RouterProps {
  path: string;
  component: React.FC;
  exact?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}
// applayout
const routes: RouterProps[] = [
  {
    path: "/",
    component: HomePage,
    exact: true,
    showHeader: true,
    showFooter: true,
  },
  {
    path: "/home",
    component: HomePage,
    showHeader: true,
    showFooter: true,
  },
  {
    path: "/admin",
    component: AdminPage,
    showHeader: false,
    showFooter: false,
  },
  {
    path: "/profile",
    component: ProfilePage,
    showHeader: true,
    showFooter: true,
  },
  {
    path: "/de-thi",
    component: DocumentPage,
    showHeader: true,
    showFooter: true,
    exact: true,
  },
  {
    path: "/lop-hoc",
    component: DocumentPage,
    showHeader: true,
    showFooter: true,
    exact: true,
  },
  {
    path: "/on-luyen",
    component: DocumentPage,
    showHeader: true,
    showFooter: true,
    exact: true,
  },
  {
    path: "/404",
    component: NotFoundPage,
    showHeader: true,
    showFooter: true,
  },
];
const Routes: React.FC = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route path={route.path} exact={route.exact} key={i}>
          <RouterComponent {...route} />
        </Route>
      ))}
      <Redirect to="/404"></Redirect>
    </Switch>
  );
};
const RouterComponent: React.FC<RouterProps> = (props) => {
  const { setShowFooter, setShowHeader } = useAppContext();
  useEffect(() => {
    setShowHeader(props.showHeader || false);
    setShowFooter(props.showFooter || false);
  });
  return <>{React.createElement(props.component)}</>;
};

export default Routes;
