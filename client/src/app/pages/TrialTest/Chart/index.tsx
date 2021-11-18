import ReactApexChart from "react-apexcharts";
import React from "react";

export default class ApexChart extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          name: "Điểm số",
          data: [10, 41, 35, 51, 49, 62, 69],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2
        },
        title: {
          text: "Tuần này",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Mon",
            "Tue",
            "Wed",
            "Thur",
            "Fri",
            "Sat",
            "Sun",
          ],
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options as any}
          series={this.state.series as any}
          type="line"
          height={350}
        />
      </div>
    );
  }
}
