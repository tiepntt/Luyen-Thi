import { ApexOptions } from "apexcharts";
import { AnalyticActionUserModal } from "models/user/userResult";
import React from "react";
import ReactApexChart from "react-apexcharts";
import "./style.scss";
interface Props {
  analyticActionUser?: AnalyticActionUserModal[];
}
const AnalyticActionUser: React.FC<Props> = ({ analyticActionUser }) => {
  const titles = analyticActionUser?.map((i) => i.title);
  const numberQuality = analyticActionUser
    ? analyticActionUser?.map((i) => i.quality)
    : [];
  let chart: { options: ApexOptions; series: any } = {
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        curve: "straight",
        show: true,

        width: [0, 2],
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: [0.5, 1],
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: titles,
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },

      tooltip: {
        shared: true,
        intersect: false,
        custom: ({ seriesIndex, dataPointIndex }) => {
          return `<div class="tool-tip-chart">
          <div className="time">Số lần luyện tập : ${numberQuality[dataPointIndex]}</div></div>`;
        },
      },
    },
    series: [{ data: numberQuality }],
  };
  return (
    <div className="user-analytic-chart">
      <ReactApexChart
        options={chart.options}
        series={chart.series}
        height={375}
      />
    </div>
  );
};

export default AnalyticActionUser;
