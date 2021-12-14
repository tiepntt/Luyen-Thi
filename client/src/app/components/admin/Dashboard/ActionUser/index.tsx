import AnalyticActionUser from "app/components/_share/Chart/AnalyticActionUser";
import {
  UserHistoryAnalyticQuery,
  UserHistoryTypeTime,
} from "models/user/userResult";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { analyticApi } from "services/api/analytic/analytic";
import { AnalyticActionUserModal } from "models/user/userResult";

const ActionUser = () => {
  const [historyAnalyticQuery, setHistoryAnalyticQuery] =
    useState<UserHistoryAnalyticQuery>({
      type: UserHistoryTypeTime.InMonth,
    });
  const [analyticActionUser, setAnalyticActionUser] =
    useState<AnalyticActionUserModal[]>();
  useEffect(() => {
    analyticApi
      .getAnalyticUser({ type: historyAnalyticQuery.type })
      .then((res) => {
        setAnalyticActionUser(res.data.analyticUser);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyAnalyticQuery]);

  console.log(analyticActionUser);

  return (
    <div className="action-user mt-3">
      <div className="d-flex">
        <h4 style={{ flexGrow: 1 }}>Hoạt động người dùng</h4>
        <div className="option">
          <Select
            className="select"
            options={timeDurationValues as any}
            onChange={(e: any) =>
              setHistoryAnalyticQuery({
                ...historyAnalyticQuery,
                type: e.value,
              })
            }
            value={timeDurationValues.find(
              (i) => i.value === historyAnalyticQuery.type
            )}
          />
        </div>
      </div>
      <div className="chart">
        <AnalyticActionUser analyticActionUser={analyticActionUser} />
      </div>
    </div>
  );
};
const timeDurationValues = [
  {
    value: UserHistoryTypeTime.InWeek,
    label: "Tháng này",
  },
  {
    value: UserHistoryTypeTime.InMonth,
    label: "Năm nay",
  },
];

export default ActionUser;
