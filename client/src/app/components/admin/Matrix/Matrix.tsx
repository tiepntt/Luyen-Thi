import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { routes } from "./router";

const Matrix = () => {
  return (
    <div className="admin-wrap">
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
        <Redirect from="/admin/matrix" to={`/admin/matrix/lop-10`} />
      </Switch>
    </div>
  );
};

export default Matrix;
