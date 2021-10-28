import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import UserResultInSubject from "./UserResultInSubject";
import UserResultOverview from "./UserResultOverview";
import "./style.scss";
const UserResult = () => {
  return (
    <div className="user-result">
      <Switch>
        <Route
          path="/profile/result/overview"
          component={UserResultOverview}
          key={0}
        />
        <Route
          path="/profile/result/:subjectCode"
          component={UserResultInSubject}
        />
        <Redirect from="/profile/result" to="/profile/result/overview" />
      </Switch>
    </div>
  );
};

export default UserResult;
