import DocumentEditQuestion from "app/components/admin/Document/document-edit-question/DocumentEditQuestion";
import { useAppContext } from "hooks/AppContext/AppContext";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import NotFoundPage from "./404/NotFound";
import AdminPage from "./Admin/Admin";
import AuthPage from "./Auth/Auth";
import ChangePassword from "./Auth/ChangePassword/ChangePassword";
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
    exact: false,
  },
  {
    path: "/class-room",
    component: DocumentPage,
    exact: false,
  },
  {
    path: "/practice",
    component: DocumentPage,
    exact: false,
  },
  {
    path: "/404",
    component: NotFoundPage,
  },
  {
    path: "/change-password",
    component: ChangePassword,
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
  const { showFooter = true, showHeader = true } = props;
  const { setShowFooter, setShowHeader } = useAppContext();
  useEffect(() => {
    setShowHeader(showHeader);
    setShowFooter(showFooter);
  });
  return <>{React.createElement(props.component)}</>;
};

export default Routes;
