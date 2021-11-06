import Routes from "app/pages/Routes";
import AppLayout from "layouts/AppLayout";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Router } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { history } from "services/history";
import {
  QueryParamProvider,
  ExtendedStringifyOptions,
  transformSearchStringJsonSafe,
} from "use-query-params";
import { Route } from "react-router-dom";
const queryStringifyOptions: ExtendedStringifyOptions = {
  transformSearchString: transformSearchStringJsonSafe,
};
const App = () => {
  return (
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
  );
};

export default App;
