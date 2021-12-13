import DocumentEditQuestion from "app/components/admin/Document/document-edit-question/DocumentEditQuestion";
import DocumentMatrixTool from "app/components/admin/Document/document-matrix-tool";
import CheckpointPractice from "app/components/practice/checkpoint";
import TrialTest from "app/components/practice/trial-test";

import { useAppContext } from "hooks/AppContext";
import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
const AdminPage = React.lazy(() => import("./Admin"));
const AuthPage = React.lazy(() => import("./Auth"));
const DocumentPage = React.lazy(() => import("./Document"));
const PracticePage = React.lazy(() => import("./Practice"));
const PracticeOptionsPage = React.lazy(() => import("./PracticeOption"));
const DocumentExam = React.lazy(() => import("./Document/document-exam"));
const HomePage = React.lazy(() => import("./Home"));
const ProfilePage = React.lazy(() => import("./Profile"));
const NotFoundPage = React.lazy(() => import("./404/NotFound"));
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
    path: "/document/:id",
    component: DocumentExam,
    exact: true,
    showHeader: false,
    showFooter: false,
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
    component: PracticePage,
    exact: true,
  },
  {
    path: "/practice/:subjectCode",
    component: PracticeOptionsPage,
    exact: true,
  },
  {
    path: "/practice/:subjectCode/checkpoint",
    component: CheckpointPractice,
    exact: true,
  },
  {
    path: "/practice/:subjectCode/exam-test",
    component: TrialTest,
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
    path: "/editor/matrix/:documentId",
    component: DocumentMatrixTool,
    showHeader: true,
    showFooter: true,
  },
  {
    path: "/auth",
    component: AuthPage,
  },
];
const Routes: React.FC = () => {
  return (
    <Suspense fallback={<></>}>
      <Switch>
        {routes.map((route, i) => (
          <Route path={route.path} exact={route.exact} key={i}>
            <RouterComponent {...route} />
          </Route>
        ))}
        <Redirect exact from="/" to="/home"></Redirect>
      </Switch>
    </Suspense>
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
