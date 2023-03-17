import React from "react";
import axios from "axios";
import $ from "jquery";
import NavbarKasir from "./navbar";
import { HiOutlineMinus } from "react-icons/hi";
import { HiOutlinePlus } from "react-icons/hi";
import { BsCartPlusFill } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";
import { BiCoffeeTogo } from "react-icons/bi";

export default class RiwayatPemesanan extends React.Component {
    constructor() {
        super()
        this.state = {
            detail_transaksi: [],
            transaksiBelumLunas: [],
            transaksiLunas: [],
            makanan: [],
            minuman: [],
            menu: [],
            meja: [],
            menus: [],
            cart: [],
            nomor_meja: [],
            token: '',
            status: '',
            id_transaksi: 0,
            total: 0,
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

    getMakanan = () => {
        let url = "http://localhost:4040/kasir/menu/jenis/makanan"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ makanan: response.data.data })
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

    getMinuman = () => {
        let url = "http://localhost:4040/kasir/menu/jenis/minuman"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ minuman: response.data.data })
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

    AddDetail = (value) => {
        axios
            .get("http://localhost:4040/kasir/menu/" + value.id_menu, this.headerConfig())
            .then((res) => {
                if (this.state.cart.length === 0) {
                    const keranjang = {
                        id_transaksi: this.state.id_transaksi,
                        id_menu: value.id_menu,
                        qty: 1
                    }
                    this.state.cart.push(keranjang)
                    this.state.menus.push(res.data.data)
                    let harga = this.state.menus.find(item => item.id_menu === value.id_menu).harga
                    this.setState({ totalBayar: harga })
                } else if (this.state.cart.find(item => item.id_menu === value.id_menu)) {
                    this.state.cart.find(item => item.id_menu === value.id_menu).qty++
                    let harga = this.state.menus.find(item => item.id_menu === value.id_menu).harga
                    this.setState({ totalBayar: this.state.totalBayar + harga })
                } else if (this.state.cart.find(item => item.id_menu !== value.id_menu)) {
                    const keranjang = {
                        id_transaksi: this.state.id_transaksi,
                        id_menu: value.id_menu,
                        qty: 1
                    }
                    this.state.cart.push(keranjang)
                    this.state.menus.push(res.data.data)
                    let harga = this.state.menus.find(item => item.id_menu === value.id_menu).harga
                    this.setState({ totalBayar: this.state.totalBayar + harga })
                }
                this.setState({
                    cart: this.state.cart,
                    menus: this.state.menus
                })
            })
            .catch(error => console.log(error))
    };

    handleMinus = (value) => {
        axios.get("http://localhost:4040/kasir/menu/" + value.id_menu, this.headerConfig())
            .then((res) => {
                let i = this.state.cart.indexOf()
                let a = this.state.menus.indexOf()
                if (this.state.cart.length === 0) {
                    window.alert("Belum ada yang dipesan")
                } else if (this.state.cart.find(item => item.id_menu === value.id_menu)) {
                    if (this.state.cart.find(item => item.qty > 0)) {
                        this.state.cart.find(item => item.id_menu === value.id_menu).qty--
                        var harga = this.state.menus.find(item => item.id_menu === value.id_menu).harga
                        this.setState({ totalBayar: this.state.totalBayar - harga })
                    } else {
                        window.alert("Belum ada yang dipesan")
                    }
                } else if (this.state.cart.find(item => item.id_menu !== value.id_menu)) {
                    window.alert("Belum ada yang dipesan")
                }
                this.state.cart.find(item => item.qty === 0) ? this.state.cart.splice(i) && this.state.menus.splice(a) : console.log("lanjut")
                console.log(this.state.cart)
                this.setState({
                    cart: this.state.cart,
                    menus: this.state.menus
                })
            })
            .catch(error => console.log(error))
    };

    getQty(itemId) {
        const item = this.state.cart.find((item) => item.id_menu === itemId);
        return item ? item.qty : 0;
    }
    getHarga(itemId) {
        const item = this.state.cart.find((item) => item.id_menu === itemId);
        const menu = this.state.menus.find((item) => item.id_menu === itemId);
        return item ? menu.harga * item.qty : 0;
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

    getNomorMeja = (value) => {
        if (value.id_meja !== null) {
            return value.meja.nomor_meja
        } else {
            return "tidak ada"
        }
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
        if (selectedItem.status === "belum_lunas") {
            $("#submit").show()
        } else {
            $("#submit").hide()
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

    Edit = selectedItem => {
        const printContents = document.getElementById("nota").innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
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

    pesanLagi = (value) => {
        // let url = "http://localhost:4040/kasir/pemesanan/detail/" + value.id_transaksi
        // axios.get(url, this.headerConfig())
        //     .then(response => {
        //         this.setState({ detail: response.data.data })
        //     })
        //     .catch(error => {
        //         if (error.response) {
        //             if (error.response.status) {
        //                 window.alert(error.response.data.message)
        //                 window.location = '/'
        //             }
        //         } else {
        //             console.log(error);
        //         }
        //     })
        $('#tambah').show()
        $("#history").hide()
        this.setState({
            id_transaksi: value.id_transaksi,
        })

    }

    batalPesan = () => {
        window.location.reload()
    }

    componentDidMount() {
        this.getMeja()
        this.getMenu()
        this.getTransaksiBelumLunas()
        this.getTransaksiLunas()
        this.getMakanan()
        this.getMinuman()
    }

    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    close = () => {
        $("#modal_detail").hide()
        this.state.total = 0
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

    closeTransaksi = () => {
        $("#modal_transaksi").hide()
    }

    pesananBaru = () => {
        $("#modal_transaksi").show()
    }

    simpan = () => {
        let sendData = {
            detail_transaksi: this.state.cart
        }
        let url = "http://localhost:4040/kasir/pemesanan/detail/add"
        axios.post(url, sendData, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                window.location = '/kasir/riwayat'

            })
            .catch(error => console.log(error))
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
                        <div id="history" className="flex justify-between mb-2 bg-gray-700 text-white p-1.5 rounded-xl items-center">
                            <h1 className="ml-4 font-extrabold text-3xl text-lime-500 tracking-wider">Riwayat Pemesanan</h1>
                        </div>
                        <div id="tambah" class="hidden overflow-x-auto sm:rounded-lg mb-3 mt-2">
                            <div className="flex justify-between mb-2 bg-gray-700 text-white p-1.5 rounded-xl items-center">
                                <h1 className="ml-4 font-extrabold text-3xl text-lime-500 tracking-wider">Daftar Menu</h1>
                                <div className="justify-between">
                                    <button className="mr-3 hover:bg-lime-600 bg-lime-500 text-white font-bold uppercase text-xs px-4 py-3 rounded-lg shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 tracking-widest" type="button" onClick={() => this.pesananBaru()}>
                                        Pesan
                                    </button>
                                    <button className="mr-0.5 hover:bg-red-700 bg-red-600 text-white font-bold uppercase text-xs px-4 py-3 rounded-lg shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 tracking-widest" type="button" onClick={() => this.batalPesan()}>
                                        Batal
                                    </button>
                                </div>
                            </div>
                            <div className="bg-gray-700 rounded-xl">
                                <button type="button" class="text-white ml-3 mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-xl px-5 py-0.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:focus:ring-lime-500">
                                    <BiCoffeeTogo className="mr-2" />
                                    Menu Minuman
                                </button>
                                <div className="grid grid-cols-5">
                                    {this.state.minuman.map((item) => (
                                        <div class="max-w-sm bg-white border m-3 border-gray-200 rounded-xl shadow dark:bg-slate-600 dark:border-gray-700" key={item.id_menu}>
                                            <div className="p-4">
                                                <img class="rounded-3xl" src={`http://localhost:4040/img/${item.gambar}`} alt="gambar" />
                                            </div>
                                            <div class="p-5 text-center">
                                                <h5 class="mb-2 text-2xl font-bold tracking-wide text-gray-900 dark:text-white">{item.nama_menu}</h5>
                                                <p class="mb-6 font-normal text-gray-700 dark:text-gray-300 tracking-wide"><span className="bg-blue-100 text-blue-800 font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-slate-500 dark:text-white">{this.convertToRupiah(item.harga)}</span></p>
                                                <button type="button" onClick={() => this.handleMinus(item)} class="text-white bg-lime-500 hover:bg-lime-600 focus:ring-2 focus:outline-none focus:ring-lime-300 font-semibold rounded-2xl text-sm p-2.5 text-center inline-flex items-center mr-2   dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-800">
                                                    <HiOutlineMinus size={15}><span class="sr-only">Kurang</span></HiOutlineMinus>
                                                </button>
                                                <div class=" inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-gray-700">
                                                    <span class="font-semibold text-white ">{this.getQty(item.id_menu)}</span>
                                                </div>
                                                <button type="button" onClick={() => this.AddDetail(item)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-lime-300 font-semibold rounded-2xl text-sm p-2.5 text-center inline-flex items-center ml-2 dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-800">
                                                    <HiOutlinePlus size={15}><span class="sr-only">Tambah</span></HiOutlinePlus>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className=" bg-gray-700 rounded-xl mt-2">
                                <button type="button" class="text-white ml-3 mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-xl px-5 py-0.5 text-center inline-flex items-center mr-2 dark:bg-gray-700 dark:focus:ring-lime-500">
                                    <FaHamburger className="mr-2" />
                                    Menu Makanan
                                </button>
                                <div className="grid grid-cols-5">
                                    {this.state.makanan.map((item) => (
                                        <div class="max-w-sm bg-white border m-3 border-gray-200 rounded-xl shadow dark:bg-slate-600 dark:border-gray-700" key={item.id_menu}>
                                            <div className="p-4">
                                                <img class="rounded-3xl" src={`http://localhost:4040/img/${item.gambar}`} alt="gambar" />
                                            </div>
                                            <div class="p-5 text-center">
                                                <h5 class="mb-2 text-2xl font-bold tracking-wide text-gray-900 dark:text-white">{item.nama_menu}</h5>
                                                <p class="mb-6 font-normal text-gray-700 dark:text-gray-300 tracking-wide"><span className="bg-blue-100 text-blue-800 font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-slate-500 dark:text-white">{this.convertToRupiah(item.harga)}</span></p>
                                                <button type="button" onClick={() => this.handleMinus(item)} class="text-white bg-lime-500 hover:bg-lime-600 focus:ring-2 focus:outline-none focus:ring-lime-300 font-semibold rounded-2xl text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-800">
                                                    <HiOutlineMinus size={15}><span class="sr-only">Kurang</span></HiOutlineMinus>
                                                </button>
                                                <div class=" inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-gray-700">
                                                    <span class="font-semibold text-white ">{this.getQty(item.id_menu)}</span>
                                                </div>
                                                <button type="button" onClick={() => this.AddDetail(item)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-lime-300 font-semibold rounded-2xl text-sm p-2.5 text-center inline-flex items-center ml-2 dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-800">
                                                    <HiOutlinePlus size={15}><span class="sr-only">Tambah</span></HiOutlinePlus>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
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
                                        <tr class="bg-white border-b dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600 tracking-wide" key={item.id_transaksi}>
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.nama_pelanggan}
                                            </th>
                                            <td class="px-6 py-4">
                                                {this.getNomorMeja(item)}
                                            </td>
                                            <td class="px-6 py-4">
                                                {this.convertTime(item.tgl_transaksi)}
                                            </td>
                                            <td class="px-6 py-4">
                                                {item.jenis_pesanan}
                                            </td>
                                            <td class="px- py-4">
                                                <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-100">{item.status}</span>
                                            </td>
                                            <td class="px-6 py-4 text-center flex justify-evenly">
                                                <button className="hover:bg-lime-700 float-right bg-lime-600 text-white font-bold uppercase text-xs px-4 py-3 rounded-xl shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.Edit(item)}>Lunas</button>
                                                <button className="hover:bg-lime-700 float-right -ml-7 bg-lime-600 text-white font-bold uppercase text-xs px-4 py-3 rounded-xl shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.pesanLagi(item)}>
                                                    <BsCartPlusFill size={18} />
                                                </button>
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
                                        <tr class="bg-white border-b dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600 tracking-wide" onClick={() => this.getDetail(item)} key={item.id_transaksi}>
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.nama_pelanggan}
                                            </th>
                                            <td class="px-6 py-4">
                                                {this.getNomorMeja(item)}
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
                                            <th scope="col" class="px-6 py-3">
                                                Harga
                                            </th>
                                            <th scope="col" class="px-6 py-3 flex items-center">
                                                Jumlah
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Total Harga
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
                                                    {this.convertToRupiah(item.menu.harga)}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {this.getQty(item.id_menu)}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {this.convertToRupiah(this.getHarga(item.id_menu))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="bg-gray-100 p-2 border-2 mb-2 hover:bg-gray-200">
                                    <p className="font-sans text-gray-700">Total Bayar: {this.convertToRupiah(this.totalBayar())}</p>
                                </div>
                                {this.state.transaksiBelumLunas.map(item => (
                                    <div className="hidden" id="submit">
                                        <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => this.Edit(item)}>Sudah Lunas</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="modal_transaksi" tabindex="-1" aria-hidden="true" class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50">
                    <div class="flex lg:h-auto w-auto justify-center" style={{ fontFamily: "modern sans" }}>
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-auto">
                            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-lime-500 dark:hover:text-white" onClick={() => this.closeTransaksi()}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Tutup modal</span>
                            </button>
                            <div class="py-5 px-10">
                                <h3 class="text-xl mb-5 font-bold text-gray-900 dark:text-white">Pemesanan</h3>
                                <div className="">
                                    <div class="mb-2">
                                        <div class="relative overflow-x-auto shadow-md sm:rounded-2xl">
                                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-300 tracking-wider">
                                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-white ">
                                                    <tr>
                                                        <th scope="col" class="px-6 py-3">
                                                            Nama Menu
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Harga
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            QTY
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Total Harga
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.menus.map((item) => (
                                                        <tr class="bg-white border-b dark:bg-slate-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {item.nama_menu}
                                                            </th>
                                                            <td class="px-6 py-4">
                                                                {this.convertToRupiah(item.harga)}
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                {this.getQty(item.id_menu)}
                                                            </td>
                                                            <td class="px-6 py-4">
                                                                {this.convertToRupiah(this.getHarga(item.id_menu))}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="bg-gray-200 p-2 border-2">
                                                <p className="font-sans text-gray-600">Total Bayar: {this.convertToRupiah(this.state.totalBayar)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => this.simpan()} type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-sm px-5 py-2.5 text-center dark:bg-lime-500 dark:hover:bg-lime-700 dark:focus:ring-lime-800">Simpan</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* NOTA */}
                <div class="relative h-auto bg-white rounded-lg shadow dark:bg-gray-700 w-auto hidden" id="nota" >
                    <a href="#" class="flex items-center justify-center m-6 text-2xl font-semibold text-gray-600">
                        <img class="w-8 h-8 mr-2" src="/logo.png" alt="logo" />
                        Wikusama Cafe
                    </a>
                    <hr></hr>
                    <div class="px-6 py-3">
                        <h3 class="text-xl font-medium mb-4 text-gray-900 dark:text-white">Informasi Kontak</h3>
                        <label class="block font-bold">Alamat:
                            <p className="font-sans text-gray-700">Jl.Merpati No.69 Sawojajar, Kedungkandang, Kota Malang</p>
                        </label>

                        <label class="block font-bold">Email:
                            <p className="font-sans text-gray-700">wikusamacafe@gmail.com</p>
                        </label>

                        <label class="block font-bold">Telepon:
                            <p className="font-sans text-gray-700">082264382796</p>
                        </label>
                    </div>
                    <hr></hr>
                    <div class="px-6 py-3">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nama Menu
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Harga
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Jumlah
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Harga
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.detail_transaksi.map((item) => (
                                    <tr class="bg-white border-b font-sans dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id_detail_transaksi}>
                                        <td class="px-6 py-4">
                                            {item.menu.nama_menu}
                                        </td>
                                        <td class="px-6 py-4">
                                            {this.convertToRupiah(item.menu.harga)}
                                        </td>
                                        <td class="px-6 py-4">
                                            {this.getQty(item.id_menu)}
                                        </td>
                                        <td class="px-6 py-4">
                                            {this.convertToRupiah(this.getHarga(item.id_menu))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="bg-gray-100 p-2 mb-2 hover:bg-gray-200">
                            <p className="font-sans text-gray-700">Total: {this.convertToRupiah(this.totalBayar())}</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div class="px-6 py-3 text-center">
                        <h3 class="text-xl font-medium mb-4 text-gray-900 dark:text-white">Terima Kasih</h3>
                        <p className="font-sans text-gray-700">Jangan lupa kembali ke Wiku Cafe</p>
                        <p className="font-serif text-sm text-gray-700">Password Wifi: wikusama</p>
                        <label class="block font-bold mt-4">
                            <p className="font-sans text-gray-700">Selamat Menikmati</p>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}