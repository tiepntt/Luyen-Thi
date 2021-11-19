import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { routes } from "./router";

const TemplateExam = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
      <Redirect from="/admin/template" to={`/admin/template/grade-10`} />
    </Switch>
  );
};

export default TemplateExam;
