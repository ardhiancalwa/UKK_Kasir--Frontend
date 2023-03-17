import React from "react";
import Chart from "react-apexcharts";
import Navbar from "./navbar";
import axios from "axios";
import $ from 'jquery';
import { GoGraph } from "react-icons/go";
import 'flowbite-datepicker';

export default class Manajer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      nama_user: "",
      tgl_transaksi: "",
      data: [],
      total: 0,
      pendapatan: 0,
      transaksi: [],
      detail_transaksi: [],
      detail: [],
      awal: "",
      akhir: "",
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
        },
      },
    };
    let user = JSON.parse(localStorage.getItem('user'))
    if (localStorage.getItem("token") && user.role === "manajer") {
      this.state.token = localStorage.getItem("token")
    } else {
      window.alert("Maaf, anda bukan manajer")
      window.location = "/"
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header;
  }

  getTransaksiUser = (event) => {
    event.preventDefault()
    let url = "http://localhost:4040/kasir/pemesanan/user/" + this.state.nama_user
    axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({ transaksi: response.data.data })
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            window.location = '/'
          }
        } else {
          console.log(error);
        }
      })
  }

  getTransaksiTanggal = (event) => {
    event.preventDefault()
    let url = `http://localhost:4040/kasir/pemesanan/tanggal/${this.timeAwal(this.state.awal)}/${this.timeAkhir(this.state.akhir)}`
    axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({ transaksi: response.data.data })
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            window.location = '/'
          }
        } else {
          console.log(error);
        }
      })
  }

  getTransaksi = () => {
    let url = "http://localhost:4040/kasir/pemesanan/"
    axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({ transaksi: response.data.data })
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            window.location = '/'
          }
        } else {
          console.log(error);
        }
      })
  }
  getDetail = (selectedItem) => {
    $("#modal_detail").show()
    axios.get("http://localhost:4040/kasir/pemesanan/detail/" + selectedItem.id_transaksi, this.headerConfig())
      .then(response => {
        this.setState({ detail_transaksi: response.data.data })
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            window.location = '/'
          }
        } else {
          console.log(error);
        }
      })
  }

  getDetailTransaksi = () => {
    axios.get("http://localhost:4040/kasir/pemesanan/detail/", this.headerConfig())
      .then(response => {
        this.setState({ detail: response.data.data })
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            window.location = '/'
          }
        } else {
          console.log(error);
        }
      })
  }

  timeAwal = time => {
    let date = new Date(time)
    return `${date.getFullYear()}-${Number(date.getMonth()) + 1}-${date.getDate()}`
  }
  timeAkhir = time => {
    let date = new Date(time)
    return `${date.getFullYear()}-${Number(date.getMonth()) + 1}-${date.getDate() + 1}`
  }

  convertTime = time => {
    let date = new Date(time)
    return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
  }

  close = () => {
    $("#modal_detail").hide()
    this.state.total = 0
  }

  componentDidMount() {
    this.getTransaksi()
    this.getDetailTransaksi()
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
              // id: "basic-bar",
              type: 'line',
              foreColor: "#FAFAFA",
            },
            xaxis: {
              categories: categories,
              labels: {
                style: {
                  fontFamily: "modern sans",
                  fontSize: "18px",
                },
              },
            },
            fill: {
              colors: "#84CC16",
            },
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  convertToRupiah(number) {

    if (number) {

      var rupiah = "";

      var numberrev = number

        .toString()

        .split("")

        .reverse()

        .join("");

      for (var i = 0; i < numberrev.length; i++)

        if (i % 3 === 0) rupiah += numberrev.substr(i, 3) + ".";

      return (

        "Rp. " +

        rupiah

          .split("", rupiah.length - 1)

          .reverse()

          .join("")

      );

    } else {

      return number;

    }

  }

  totalBayar = () => {
    for (let i = 0; i < this.state.detail_transaksi.length; i++) {
      var harga = this.state.detail_transaksi[i].menu.harga
      var qty = this.state.detail_transaksi[i].qty
      var subTotal = harga * qty
      this.state.total = this.state.total + subTotal
    }
    let totalBayar = this.state.total
    return totalBayar
  }

  pendapatan = () => {
    $("#pendapatan").show()
    $("#btn").hide()
    axios.get("http://localhost:4040/kasir/pemesanan/detail/", this.headerConfig())
      .then(response => {
        this.setState({ detail: response.data.data })
        for (let i = 0; i < response.data.data.length; i++) {
          var harga = response.data.data[i].menu.harga
          var qty = response.data.data[i].qty
          var subTotal = harga * qty
          this.setState({ pendapatan: this.state.pendapatan + subTotal })
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            window.location = '/'
          }
        } else {
          console.log(error);
        }
      })
  }

  getNomorMeja = (value) => {
    if (value.id_meja !== null) {
      return value.meja.nomor_meja
    } else {
      return "tidak ada"
    }

  }

  laporan = () => {
    $("#refresh").hide()
    const printContents = document.getElementById("laporan").innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    window.location.reload()
  }

  render() {
    return (
      <div className='flex h-screen w-full'>
        <div class="w-full h-screen">
          <Navbar />
          <nav class="flex px-5 py-2 text-gray-700 bg-gray-50 dark:bg-transparent " aria-label="Breadcrumb">
            <ol class="inline-flex mt-16 items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a href="/manajer/home" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                  Beranda
                </a>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Laporan Penjualan</span>
                </div>
              </li>
            </ol>
          </nav>
          <div className="m-3 h-screen" style={{ fontFamily: "modern sans" }}>
            <div className="flex justify-between mb-2 bg-gray-700 text-white p-1.5 rounded-xl items-center">
              <h1 className="ml-4 font-extrabold text-3xl text-lime-500 tracking-wider">Laporan Penjualan</h1>
            </div>
            <div class="overflow-x-auto p-4 sm:rounded-xl bg-gray-700">
              <button type="button" class="text-white ml-3 mb-5 mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-bold rounded-xl text-xl px-5 py-0.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:focus:ring-lime-500">
                <button data-tooltip-target="tooltip-edit" data-tooltip-placement="bottom" type="button" class="text-lime-500 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm p-1.5 text-center inline-flex items-center mr-3 dark:bg-white  ">
                  <GoGraph size={18} />
                  <span class="sr-only">Edit</span>
                </button>
                Grafik Menu Terlaris
              </button>
              <div class="p-4 mb-6 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <Chart
                  options={this.state.options}
                  series={this.state.data}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
            <div class="overflow-x-auto mt-2 shadow-md sm:rounded-lg" style={{ fontFamily: "modern sans" }}>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption class="p-5 text-xl font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-700">
                  <div className="flex justify-between">
                    <div>
                      <h1>Riwayat Penjualan</h1>
                      <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Riwayat pemesanan pada kafe Wikusama.</p>
                      <button className="float-right mr-3 hover:bg-green-800 bg-green-700 text-white text-sm py-2 px-4 rounded-lg shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.laporan()}>
                        Unduh Laporan
                      </button>
                      <button id="btn" className="float-right mr-3 hover:bg-lime-600 bg-lime-500 text-white text-sm py-2 px-4 rounded-lg shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.pendapatan()}>
                        Tampilkan Pendapatan
                      </button>
                      <div className="bg-gray-700 items-center hidden" id="pendapatan">
                        <p className=" text-gray-300 text-sm">Total Pendapatan: {this.convertToRupiah(this.state.pendapatan)}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <form className="mr-3" onSubmit={(event) => this.getTransaksiUser(event)}>
                        <button type="button" data-collapse-toggle="search" aria-controls="search" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                          <span class="sr-only">Search</span>
                        </button>
                        <div class="hidden md:block">
                          <input type="search" id="search" class="block w-full p-2 pr-10 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" placeholder="Cari..." name="nama_user" onChange={this.bind} required />
                        </div>
                      </form>
                      <div className="">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        </div>
                        <input
                          onChange={this.bind}
                          name="awal"
                          type="date"
                          className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                          placeholder="Select date start"
                        />
                      </div>
                      <span className="mx-3 text-base text-gray-300">to</span>
                      <div className="">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        </div>
                        <input
                          onChange={this.bind}
                          name="akhir"
                          type="date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2x  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                          placeholder="Select date end"
                        />
                      </div>
                      <div className="flex items-center">
                        <button className="ml-2 hover:bg-lime-700 bg-lime-500 text-white text-sm py-2 px-4 rounded-lg shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={(event) => this.getTransaksiTanggal(event)}>
                          Cari
                        </button>
                      </div>
                    </div>
                  </div>
                </caption>
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-lime-300 border-t border-b border-lime-300">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Nama Pelanggan
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Nomor Meja
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Kasir
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Tanggal Pemesanan
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Jenis Pesanan
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.transaksi.map(item => (
                    <tr class="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => this.getDetail(item)} key={item.id_transaksi}>
                      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.nama_pelanggan}
                      </td>
                      <td class="px-6 py-4">
                        {this.getNomorMeja(item)}
                      </td>
                      <td class="px-6 py-4">
                        {item.user.nama_user}
                      </td>
                      <td class="px-6 py-4">
                        {this.convertTime(item.tgl_transaksi)}
                      </td>
                      <td class="px-6 py-4">
                        {item.jenis_pesanan}
                      </td>
                      <td class="px-6 py-4">
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Modal */}
          <div id="modal_detail" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50">
            <div class="flex md:h-auto w-auto justify-center ">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => this.close()}>
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Tutup modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                  <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Detail</h3>
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Nama Menu
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Jumlah
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.detail_transaksi.map(item => (
                        <tr class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id_detail_transaksi}>
                          <td class="px-6 py-4">
                            {item.menu.nama_menu}
                          </td>
                          <td class="px-6 py-4">
                            {item.qty}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-gray-100 p-2 border-2 mb-2 hover:bg-gray-200">
                    <p className="font-sans text-gray-700">Total Bayar: {this.convertToRupiah(this.totalBayar())}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}