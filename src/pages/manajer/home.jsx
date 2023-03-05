import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import NavbarManajer from "./navbar";

export default class HomeManajer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          background: "#f4f4f4",
          foreColor: "#333",
        },
        xaxis: {
          categories: [
            "New York",
            "Los Angeles",
            "Chicago",
            "Houston",
            "Philadelphia",
            "Phoenix",
            "San Antonio",
            "San Diego",
            "Dallas",
            "San Jose",
          ],
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        fill: {
          colors: ["#F44336"],
        },
        dataLabels: {
          enabled: false,
        },

        title: {
          text: "Data Penjulan",
          align: "center",
          margin: 20,
          offsetY: 20,
          style: {
            fontSize: "25px",
          },
        },
      },
      series: [
        {
          name: "Population",
          data: [
            axios({
              method: "GET",
              url: "http://localhost:4040/cafe/pemesanan/detail",
            }).then(function (response) {
              Chart.updateSeries([
                {
                  name: "Sales",
                  data: response.data.data,
                },
              ]);
            }),
            // 8550405, 3971883, 2720546, 2296224, 1567442, 1563025, 1469845,
            // 1394928, 1300092, 1026908,
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div class="p-4 sm:ml-64">
        <NavbarManajer />
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <React.Fragment>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height="380"
            />
          </React.Fragment>
        </div>
      </div>
    );
  }
}