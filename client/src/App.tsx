import Routes from "app/pages/Routes";
import AppLayout from "layouts/AppLayout/AppLayout";
import React from "react";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./app/pages/404/NotFound";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import { Router } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { history } from "services/history";
import {
  QueryParamProvider,
  ExtendedStringifyOptions,
  transformSearchStringJsonSafe,
} from "use-query-params";
const queryStringifyOptions: ExtendedStringifyOptions = {
  transformSearchString: transformSearchStringJsonSafe,
};
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <div className="app">
          <Router history={history}>
            <QueryParamProvider
              ReactRouterRoute={Route}
              stringifyOptions={queryStringifyOptions}
            >
              <AppLayout>
                <Routes />
              </AppLayout>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </QueryParamProvider>
          </Router>
        </div>
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
