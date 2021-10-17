import { AppContext, AppModels } from "hooks/AppContext/AppContext";
import React, { useState } from "react";

import AppNavbar from "app/components/_share/Menu/AppNavbar/AppNavbar";
import AppFooter from "app/components/_share/Footer/AppFooter/AppFooter";
import "./style.scss";

const AppLayout: React.FC = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const [, setMobileNavOpen] = useState(false);
  const scrollTop = () => {
    try {
      let element = document.getElementById("app");
      element &&
        element.scrollIntoView({
          block: "start",
          inline: "start",
          behavior: "smooth",
        });
    } catch (e) {}
  };
  const value: AppModels = {
    showHeader,
    showFooter,
    setShowHeader,
    setShowFooter,
    scrollTop,
  };
  return (
    <AppContext.Provider value={value}>
      <div id="app">
        {showHeader && (
          <div className="header">
            <AppNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
          </div>
        )}
        <div className="app-content">{children}</div>
        <div className="footer">{showFooter && <AppFooter />}</div>
      </div>
    </AppContext.Provider>
  );
};

export default AppLayout;
