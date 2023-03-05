import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Navbar from "./navbar";
import axios from "axios";

export default class Manajer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      data: [],
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
        },
      },
    };
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token")
    } else {
      window.location = "/"
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header;
  }

  componentDidMount() {
    axios
      .get("http://localhost:4040/kasir/pemesanan/qtybymenu", this.headerConfig())
      .then((response) => {
        const categories = response.data.map((data) => data.nama_menu);
        const values = response.data.map((data) => data.total_qty);

        this.setState({
          data: [
            {
              name: "Value",
              data: values,
            },
          ],
          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: categories,
              labels: {
                style: {
                  fontFamily: "Arial, sans-serif",
                  fontSize: "15px",
                },
              },
            },
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div class="p-4 mt-20">
        <Navbar />
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Chart
            options={this.state.options}
            series={this.state.data}
            type="bar"
            height={350}
          />
        </div>
      </div>
    );
  }
}