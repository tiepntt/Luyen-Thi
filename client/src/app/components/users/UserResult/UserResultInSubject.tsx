import { Grid } from "@material-ui/core";
import { UserResultBugget } from "app/components/_share/Bugget/UserResultBugget";
import { AlarmClock, CheckedCheckbox, ClosedBook } from "assets/images/user";
import { UserResultAnalytic } from "models/user/userResult";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { profileApi } from "services/api/user/profile";
import { TimeFunction } from "utils/timeFunction";

const UserResultInSubject = () => {
  const { subjectCode } = useParams<any>();
  const [userAnalyticResult, setUserAnalyticResult] =
    useState<UserResultAnalytic>();
  useEffect(() => {
    profileApi.getAnalytic({ subjectCode: subjectCode }).then((res) => {
      if (res.status === 200) {
        setUserAnalyticResult(res.data);
      }
    });
  }, [subjectCode]);
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

      <div className="anayltic-chart-overview"></div>
    </div>
  );
};

export default UserResultInSubject;
