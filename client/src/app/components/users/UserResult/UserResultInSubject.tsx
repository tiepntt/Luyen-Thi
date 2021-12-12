import { Grid } from "@material-ui/core";
import { UserResultBugget } from "app/components/_share/Bugget/UserResultBugget";
import { AlarmClock, CheckedCheckbox, ClosedBook } from "assets/images/user";
import { UserResultAnalytic } from "models/user/userResult";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { profileApi } from "services/api/user/profile";
import { analyticApi } from "services/api/analytic/analytic";

import { TimeFunction } from "utils/timeFunction";
import UserAnalyticResultInSubject from "app/components/_share/Table/UserAnalyticResultInSubject";
import { useAppContext } from "hooks/AppContext";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";

const UserResultInSubject = () => {
  const { subjectCode } = useParams<any>();
  const [userAnalyticResult, setUserAnalyticResult] =
    useState<UserResultAnalytic>();
  const [userResultChapters, setUserResultChapters] = useState([]);
  const { chapters } = useAppContext();
  const { subjects } = useSubjects();
  const subject = subjects.find((s) => s.code === subjectCode);
  const chaptersSubject = chapters.filter((c) => c.subjectId === subject?.id);

  useEffect(() => {
    profileApi.getAnalytic({ subjectCode: subjectCode }).then((res) => {
      if (res.status === 200) {
        setUserAnalyticResult(res.data);
      }
    });
    analyticApi.getResultInSubject(subject?.id || "").then((res) => {
      setUserResultChapters(res.data.analytic);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectCode, subject]);

  return (
    <div id="overview">
      <h5 className="label mt-1">Tổng quan</h5>
      <div className="list-bugget mt-3">
        <Grid container spacing={5}>
          <Grid item lg={4} md={4} sm={12}>
            <UserResultBugget
              image={AlarmClock}
              title="Luyện tập"
              number={TimeFunction.convertMinutes(
                userAnalyticResult?.totalTime || 0
              )}
              color="#263197"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12}>
            <UserResultBugget
              image={ClosedBook}
              title="Đã làm"
              number={`${userAnalyticResult?.numberDocument} tài liệu`}
              color="#C9512B"
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12}>
            <UserResultBugget
              image={CheckedCheckbox}
              title="Chính xác"
              number={`${userAnalyticResult?.percentCorrect}%`}
              color="#2BC986"
            />
          </Grid>
        </Grid>
      </div>

      <div className="my-5">
        <div className="label-inlne d-flex">
          <h5 className="label mt-4 mb-3" style={{ flexGrow: 1 }}>
            Thống kê kết quả
          </h5>
        </div>
        <div className="analytic-chart-overview">
          <UserAnalyticResultInSubject
            chapter={chaptersSubject}
            resultChapter={userResultChapters}
            codeSubject={subjectCode}
          />
        </div>
      </div>
    </div>
  );
};

export default UserResultInSubject;
