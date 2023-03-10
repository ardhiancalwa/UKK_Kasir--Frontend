import React from "react";
import axios from "axios";
import $ from "jquery";
import NavbarKasir from "./navbar";

export default class User extends React.Component {
    constructor() {
        super()
        this.state = {
            detail_transaksi: [],
            transaksiBelumLunas: [],
            transaksiLunas: [],
            menu: [],
            meja: [],
            token: '',
            id_transaksi: 0,
            status: '',
        }
        let user = JSON.parse(localStorage.getItem('user'))
        if (localStorage.getItem("token") && user.role === 'kasir') {
            this.state.token = localStorage.getItem("token")
        } else {
            window.alert("Maaf, anda bukan kasir")
            window.location = "/"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header;
    }
    getMeja = () => {
        let url = "http://localhost:4040/kasir/meja/"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ meja: response.data.data })
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

    getMenu = () => {
        let url = "http://localhost:4040/kasir/menu/"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ menu: response.data.data })
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

    getTransaksiBelumLunas = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        let url = "http://localhost:4040/kasir/pemesanan/riwayat/belum_lunas/" + user.id_user
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ transaksiBelumLunas: response.data.data })
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

    getTransaksiLunas = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        let url = "http://localhost:4040/kasir/pemesanan/riwayat/lunas/" + user.id_user
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ transaksiLunas: response.data.data })
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
        let url = "http://localhost:4040/kasir/pemesanan/detail/" + selectedItem.id_transaksi
        axios.get(url, this.headerConfig())
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

    Edit = selectedItem => {
        let sendData = {
            id_transaksi: selectedItem.id_transaksi,
            status: 'lunas'
        }
        let data = {
            id_meja: selectedItem.id_meja,
            status_meja: 'tersedia'
        }
        axios.put('http://localhost:4040/kasir/pemesanan/', sendData, this.headerConfig())
        axios.put('http://localhost:4040/kasir/meja/', data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                window.location.reload()
            })
            .catch(error => console.log(error))
    }
    componentDidMount() {
        this.getMeja()
        this.getMenu()
        this.getTransaksiBelumLunas()
        this.getTransaksiLunas()
    }

    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }
    close = () => {
        $("#modal_detail").hide()
    }

    render() {
        return (
            <div className='flex h-screen w-full'>
                <div class="w-full h-screen">
                    <NavbarKasir />
                    <nav class="flex px-5 py-2 text-gray-700 bg-gray-50 dark:bg-transparent " aria-label="Breadcrumb">
                        <ol class="inline-flex mt-16 items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                                <a href="/kasir/home" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Beranda
                                </a>
                            </li>
                            <li class="inline-flex items-center">
                                <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <a href="/kasir/pemesanan" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    Pemesanan
                                </a>
                            </li>
                            <li aria-current="page">
                                <div class="flex items-center">
                                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Riwayat Pemesanan</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="m-3 h-screen" style={{ fontFamily: "modern sans" }}>
                        <div className="flex justify-between mb-2 bg-gray-700 text-white p-1.5 rounded-xl items-center">
                            <h1 className="ml-4 font-extrabold text-3xl text-lime-500 tracking-wider">Riwayat Pemesanan</h1>
                        </div>
                        <div class="overflow-x-auto sm:rounded-lg" style={{ fontFamily: "modern sans" }}>
                            <table class="w-full text-sm text-left rounded-b-xl text-gray-500 dark:text-gray-400">
                                <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-700 tracking-wider">
                                    Belum Lunas
                                    <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Daftar pelanggan yang belum membayar.</p>
                                </caption>
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b border-t border-solid dark:border-slate-500 dark:bg-gray-700 dark:text-lime-300 tracking-wide">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Nama Pelanggan
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Nomor Meja
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Tanggal
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Jenis Pesanan
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.transaksiBelumLunas.map(item => (
                                        <tr class="bg-white border-b dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600 tracking-wide">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.nama_pelanggan}
                                            </th>
                                            <td class="px-6 py-4">
                                                {item.meja.nomor_meja}
                                            </td>
                                            <td class="px-6 py-4">
                                                {this.convertTime(item.tgl_transaksi)}
                                            </td>
                                            <td class="px-6 py-4">
                                                {item.jenis_pesanan}
                                            </td>
                                            <td class="px-6 py-4">
                                                <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-100">{item.status}</span>
                                            </td>
                                            <td class="px-6 py-4 text-center flex justify-evenly">
                                                <button className="hover:bg-lime-500 float-right mr-3 bg-lime-600 text-white font-bold uppercase text-xs px-4 py-3 rounded-xl shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.Edit(item)}>Sudah Bayar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <table class="w-full  text-sm text-left mt-5 text-gray-500 dark:text-gray-400">
                                <caption class="p-5 text-lg font-semibold text-left rounded-t-lg text-gray-900 bg-white dark:text-white dark:bg-gray-700 tracking-wider">
                                    Sudah Lunas
                                    <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Daftar Pelanggan yang sudah bayar</p>
                                </caption>
                                <thead class="text-xs text-gray-700 uppercase border-b border-t dark:border-slate-500 bg-gray-50 dark:bg-gray-700 dark:text-lime-300 tracking-wide">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Nama Pelanggan
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Nomor Meja
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Tanggal
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
                                    {this.state.transaksiLunas.map(item => (
                                        <tr class="bg-white border-b dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600 tracking-wide">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.nama_pelanggan}
                                            </th>
                                            <td class="px-6 py-4">
                                                {item.meja.nomor_meja}
                                            </td>
                                            <td class="px-6 py-4">
                                                {this.convertTime(item.tgl_transaksi)}
                                            </td>
                                            <td class="px-6 py-4">
                                                {item.jenis_pesanan}
                                            </td>
                                            <td class="px-6 py-4">
                                                <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-200">{item.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nama Pelanggan
                                    </th>
                                    <th scope="col" class="px-6 py-3 flex items-center">
                                        Nomor Meja
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Tanggal Pemesanan
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Jenis Pesanan
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.transaksiBelumLunas.map(item => (
                                    <tr class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => this.getDetail(item)} key={item.id_transaksi}>
                                        <td class="px-6 py-4">
                                            {item.nama_pelanggan}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.meja.nomor_meja}
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
                                        <td class="px-6 py-4 text-center flex justify-evenly">
                                            <button className="hover:bg-green-500 float-right mr-3 bg-green-600 text-white font-bold uppercase text-xs px-4 py-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.Edit(item)}>Sudah Bayar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <h2 className="dark:text-white text-lg font-sans mb-2">Lunas</h2>
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nama Pelanggan
                                    </th>
                                    <th scope="col" class="px-6 py-3 flex items-center">
                                        Nomor Meja
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Tanggal Pemesanan
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Jenis Pesanan
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.transaksiLunas.map(item => (
                                    <tr class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => this.getDetail(item)} key={item.id_transaksi}>
                                        <td class="px-6 py-4">
                                            {item.nama_pelanggan}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.meja.nomor_meja}
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
                        </table> */}
                        </div>
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
                                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Detail Pemesanan</h3>
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Nama Menu
                                            </th>
                                            <th scope="col" class="px-6 py-3 flex items-center">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}