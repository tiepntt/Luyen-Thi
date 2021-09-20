import React from "react";
import { Redirect, Route, Switch } from "react-router";

import NotFoundPage from "./404/NotFound";
import AdminPage from "./Admin/Admin";
import DocumentPage from "./Document/Document";
import ExamPage from "./Exam/Exam";
import HomePage from "./Home/Home";
import ProfilePage from "./Profile/Profile";
interface RouterProps {
  path: string;
  component: React.FC;
  exact?: boolean;
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
  },
  {
    path: "/profile",
    component: ProfilePage,
  },
  {
    path: "/exam",
    component: ExamPage,
  },
  {
    path: "/404",
    component: NotFoundPage,
  },
  {
    path: "/document",
    component: DocumentPage,
  },
];
const Routes: React.FC = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} {...route}></Route>
      ))}
      <Redirect to="/404"></Redirect>
    </Switch>
  );
};

export default Routes;
