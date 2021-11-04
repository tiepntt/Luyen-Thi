import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { routes } from "./router";

const Matrix = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
      <Redirect from="/admin/matrix" to={`/admin/matrix/grade-10`} />
    </Switch>
  );
};

export default Matrix;
