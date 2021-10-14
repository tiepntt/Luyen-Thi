import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
  ],
  datasets: [
    {
      label: "Số lượt làm đề",
      data: [12, 19, 3, 0, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(111, 0, 0, 0.2)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChart = () => <Line data={data} options={options as any} />;

export default LineChart;
