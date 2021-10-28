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
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  datasets: [
    {
      label: "Điểm trung bình",
      data: [5.5, 6.5, 7.1, 7.4, 6.5, 8.0, 6.5, 6.5, 7.5, 7.75, 8.75],
      borderColor: "red",
      borderWidth: 1,
      backgroundColor: "red",
      yAxisID: "y",
      pointRadius: 1,
      fill: "+2",
    },
    {
      label: "Số lượt làm đề",
      data: [23, 18, 19, 25, 30, 35, 40, 15, 5, 20, 32, 27],
      borderColor: "red",
      backgroundColor: "red",
      yAxisID: "y1",
      borderWidth: 1,
      pointRadius: 1,
      fill: {
        target: "origin",
        above: "rgba(255, 0, 0,1)", // Area will be red above the origin
        below: "rgba(0, 0, 255,0.5)", // And blue below the origin
      },
    },
  ],
};

const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
    plugins: {
      filler: {
        propagate: true,
      },
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      min: 0,
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      min: 0,

      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
};

const LineChart = () => <Line data={data} options={options as any} />;

export default LineChart;
