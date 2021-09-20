import { AppContext, AppModels } from "hooks/AppContext/AppContext";
import React, { useState } from "react";

const AppLayout: React.FC = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const value: AppModels = {
    showHeader,
    showFooter,
    setShowHeader,
    setShowFooter,
  };
  return (
    <AppContext.Provider value={value}>
      <div className="header"></div>
      {children}
      <div className="footer"></div>
    </AppContext.Provider>
  );
};

export default AppLayout;
