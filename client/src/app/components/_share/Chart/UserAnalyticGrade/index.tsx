import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
interface Props {
  values: any[];
  labels: string[];
}
const UserAnalyticGrade: React.FC<Props> = ({ values, labels }) => {
  const chart: { series: any[]; options: ApexOptions } = {
    series: values,
    options: {
      stroke: {
        width: 0,
      },
      chart: {
        type: "donut",
      },
      labels: labels,
      legend: {
        position: "bottom",
        show: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
            },
            legend: {
              position: "top",
              show: true,
            },
          },
        },
      ],
    },
  };
  return (
    <div className="user-analytic-grade-chart">
      <ReactApexChart
        options={chart.options}
        series={chart.series}
        height={300}
        type="donut"
      />
    </div>
  );
};

export default UserAnalyticGrade;
