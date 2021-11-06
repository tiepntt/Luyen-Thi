import React from "react";
import { Redirect, Route, Switch } from "react-router";
import ExamEdit from "./ExamEdit";
import ExamList from "./ExamList";

const ExamPage: React.FC = () => {
  return (
    <div className="exam-page">
      <Switch>
        <Route path="/exam" exact component={ExamList} />
        <Route path="/exam/:id" exact component={ExamList} />
        <Route path="/exam/:id/edit" exact component={ExamEdit} />
        <Route path="/exam/:id/detail" exact component={ExamList} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default ExamPage;
