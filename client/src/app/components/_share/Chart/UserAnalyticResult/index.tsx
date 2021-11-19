import { ApexOptions } from "apexcharts";
import { UserHistoryAnalytic } from "models/user/userResult";
import React from "react";
import ReactApexChart from "react-apexcharts";
import "./style.scss";
interface Props {
  userHistoies: UserHistoryAnalytic[];
}
const UserAnalyticResult: React.FC<Props> = ({ userHistoies }) => {
  const scores = userHistoies.map((i) => i.medium);
  const times = userHistoies.map((i) => i.total);
  let chart: { options: ApexOptions; series: any } = {
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          colors: { ranges: [{ color: "#FAA515" }] },
        },
      },
      legend: {
        show: true,
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
      labels: userHistoies.map((i) => i.label),
      markers: {
        size: [2, 0],
        fillOpacity: [1, 0],
        strokeOpacity: [1, 0],
        colors: ["#FAA515", "transperent"],
        strokeColors: ["#FAA515", "transperent"],
        hover: {
          sizeOffset: 2,
          size: 2,
        },
      },

      yaxis: [
        {
          min: 0,
          labels: {
            formatter: function (val) {
              return val.toFixed(0);
            },
          },
          axisBorder: {
            show: true,
          },
        },
        {
          min: 0,
          max: 10,
          opposite: true,
          axisBorder: {
            show: true,
          },
          labels: {
            formatter: function (val) {
              return val.toFixed(0);
            },
          },
        },
      ],
      xaxis: {},

      tooltip: {
        shared: true,
        intersect: false,
        custom: ({ seriesIndex, dataPointIndex }) => {
          return `<div class="tool-tip-chart">
          <div className="point">Điểm trung bình : ${scores[dataPointIndex]}</div>
          <div className="time">Số lần luyện tập : ${times[dataPointIndex]}</div></div>`;
        },
      },
    },
    series: [
      {
        name: "Số lượt làm bài",
        type: "column",
        data: times,
      },
      {
        name: "Điểm trung bình",
        type: "line",
        data: scores,
      },
    ],
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

export default UserAnalyticResult;
