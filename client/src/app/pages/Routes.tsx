import DocumentEditQuestion from "app/components/admin/document/document-edit-question/DocumentEditQuestion";
import { useAppContext } from "hooks/AppContext/AppContext";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";

import NotFoundPage from "./404/NotFound";
import AdminPage from "./Admin/Admin";
import AuthPage from "./Auth/Auth";
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
  },
  {
    path: "/home",
    component: HomePage,
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
  },
  {
    path: "/document",
    component: DocumentPage,
    exact: true,
  },
  {
    path: "/class-room",
    component: DocumentPage,
    exact: true,
  },
  {
    path: "/practice",
    component: DocumentPage,
    exact: true,
  },
  {
    path: "/404",
    component: NotFoundPage,
  },
  {
    path: "/editor/document/:id",
    component: DocumentEditQuestion,
    showHeader: false,
    showFooter: false,
  },
  {
    path: "/auth",
    component: AuthPage,
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
    setShowHeader(props.showHeader || true);
    setShowFooter(props.showFooter || true);
  });
  return <>{React.createElement(props.component)}</>;
};

export default Routes;
