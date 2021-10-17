import { AppContext, AppModels } from "hooks/AppContext/AppContext";
import React, { useEffect, useState } from "react";

import AppNavbar from "app/components/_share/Menu/AppNavbar/AppNavbar";
import AppFooter from "app/components/_share/Footer/AppFooter/AppFooter";
import "./style.scss";
import { Grade } from "models/matrix/Grade";
import { Subject } from "models/matrix/Subject";
import { homeApi } from "services/api/home";
import { toastService } from "services/toast";

const AppLayout: React.FC = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

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
  useEffect(() => {
    homeApi.load().then((res) => {
      if (res.status === 200) {
        setGrades(res.data.grades);
        setSubjects(res.data.subjects);
      } else {
        toastService.error(res.data.message);
      }
    });
  }, []);
  const value: AppModels = {
    showHeader,
    showFooter,
    setShowHeader,
    setShowFooter,
    scrollTop,
    grades,
    subjects,
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
