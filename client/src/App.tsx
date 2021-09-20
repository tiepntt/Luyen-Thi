import Routes from "app/pages/Routes";
import AppLayout from "layouts/AppLayout/AppLayout";
import React from "react";
import { Router } from "react-router";

import { history } from "services/history";
const App = () => {
  return (
    <Router history={history}>
      <AppLayout>
        <Routes />
      </AppLayout>
    </Router>
  );
};

export default App;
