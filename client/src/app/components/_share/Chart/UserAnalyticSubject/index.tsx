import { ApexOptions } from "apexcharts";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import React from "react";
import ReactApexChart from "react-apexcharts";

const UserAnalyticSubject = () => {
  const values = [6, 9, 8, 5.5, 5, 4, 8.5, 7, 9.5, 6.0];
  const { subjects } = useSubjects();
  const labels = subjects.map((s) => s.name);
  const chart: { series: any[]; options: ApexOptions } = {
    series: [
      {
        data: values,
      },
    ],
    options: {
      stroke: {
        width: 1,
        colors: ["#fff"],
      },

      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom",
          },
        },
      },
      chart: {
        type: "bar",
        height: 380,
        toolbar: {
          show: false,
        },
      },
      labels: labels,
      colors: [
        "#33b2df",
        "#546E7A",
        "#d4526e",
        "#13d8aa",
        "#A5978B",
        "#2b908f",
        "#f9a3a4",
        "#90ee7e",
        "#f48024",
        "#69d2e7",
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val: number, opt) {
          return (
            opt.w.globals.labels[opt.dataPointIndex] +
            ":  " +
            Math.round(val * 100) / 100
          );
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        max: 10,
        min: 0,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        theme: "dark",
        x: {
          show: true,
        },
      },
    },
  };
  return (
    <div className="user-analytic-chart">
      <ReactApexChart
        options={chart.options}
        series={chart.series}
        height={375}
        type="bar"
      />
    </div>
  );
};

export default UserAnalyticSubject;
