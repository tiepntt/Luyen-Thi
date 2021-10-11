import { AppContext, AppModels } from "hooks/AppContext/AppContext";
import React, { useState } from "react";

import AppNavbar from "app/components/_share/Menu/AppNavbar/AppNavbar";
import AppFooter from "app/components/_share/Footer/AppFooter/AppFooter";
import "./style.scss";

const AppLayout: React.FC = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const value: AppModels = {
    showHeader,
    showFooter,
    setShowHeader,
    setShowFooter,
  };
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <AppContext.Provider value={value}>
      <div id="app">
        {showHeader && (
          <div className="header">
            <AppNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
          </div>
        )}
        <div className="app-content">{children}</div>
        <div className="footer">
          <AppFooter />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default AppLayout;
