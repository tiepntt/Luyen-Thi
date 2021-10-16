import React from "react";
import { Route, Switch } from "react-router";
import "./style.scss";
import { routes } from "./router";
import { Redirect } from "react-router-dom";

const DocumentPage: React.FC = () => {
  return (
    <div className="document-page">
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
        <Redirect to="/404"></Redirect>
      </Switch>
    </div>
  );
};

export default DocumentPage;
