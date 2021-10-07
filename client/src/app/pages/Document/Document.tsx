import React from "react";
import { Route, Switch } from "react-router";

import { routes } from "./router";

const DocumentPage: React.FC = () => {
  return (
    <div>
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
};

export default DocumentPage;
