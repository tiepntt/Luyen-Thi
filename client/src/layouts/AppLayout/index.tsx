import React, { useEffect, useState } from "react";
import { AppContext, AppModels } from "hooks/AppContext";
import AppNavbar from "app/components/_share/Menu/AppNavbar";
import AppFooter from "app/components/_share/Footer/AppFooter";
import { Grade } from "models/matrix/Grade";
import { Subject } from "models/matrix/Subject";
import { homeApi } from "services/api/home";
import { toastService } from "services/toast";
import { useDispatch } from "react-redux";
import { UserFunction } from "redux/user/action";
import "./style.scss";
import AppSideBar from "app/components/sidebars/AppSideBar";
import { LevelQuestion } from "models/matrix/Level";
import { ChapterDetail } from "models/matrix/Chapter";
const AppLayout: React.FC = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [timeZone, setTimeZone] = useState("Asia/Ho_Chi_Minh");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [levels, setLevels] = useState<LevelQuestion[]>([]);
  const [chapters, setChapters] = useState<ChapterDetail[]>([]);
  const dispatch = useDispatch();

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const scrollTop = (id?: string, position = "start") => {
    try {
      let element = document.getElementById(id || "app");
      element &&
        element.scrollIntoView({
          block: position as any,
          inline: position as any,
          behavior: "smooth",
        });
    } catch (e) {}
  };
  useEffect(() => {
    homeApi.load().then((res) => {
      if (res.status === 200) {
        setGrades(res.data.grades);
        setSubjects(res.data.subjects);
        setLevels(res.data.levels);
        setChapters(res.data.chapters);
        if (res.data.userInfo) {
          dispatch(UserFunction.updateUser(res.data.userInfo));
        }
      } else {
        toastService.error(res.data.message);
      }
    });
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(timezoneName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const value: AppModels = {
    showHeader,
    showFooter,
    setShowHeader,
    setShowFooter,
    scrollTop,
    grades,
    subjects,
    timeZone,
    levels,
    setSubjects,
    chapters,
  };
  return (
    <AppContext.Provider value={value}>
      <div id="app">
        {showHeader && (
          <div className="header">
            <AppNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <AppSideBar
              onMobileClose={() => setMobileNavOpen(false)}
              openMobile={isMobileNavOpen}
            />
          </div>
        )}
        <div className="app-content">{children}</div>
        <div className="footer">{showFooter && <AppFooter />}</div>
      </div>
    </AppContext.Provider>
  );
};

export default AppLayout;
