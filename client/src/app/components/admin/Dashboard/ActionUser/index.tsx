import React from "react";
import Select from "react-select";
const ActionUser = () => {
  return (
    <div className="action-user mt-3">
      <div className="d-flex">
        <h4 style={{ flexGrow: 1 }}>Hoạt động người dùng</h4>
        <div className="option">
          <Select options={options as any} defaultValue={options[0]} />
        </div>
      </div>
      <div className="chart">{/* <LineChart /> */}</div>
    </div>
  );
};
const options = [
  {
    value: 1,
    label: "Tháng này",
  },
  {
    value: 2,
    label: "Tuần này",
  },
  {
    value: 3,
    label: "Năm qua",
  },
];

export default ActionUser;
