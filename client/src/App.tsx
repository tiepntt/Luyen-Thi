import Routes from "app/pages/Routes";
import AppLayout from "layouts/AppLayout/AppLayout";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Router } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { history } from "services/history";

const App = () => {
  return (
    <div className="app">
      <Router history={history}>
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
      </Router>
    </div>
  );
};

export default App;
