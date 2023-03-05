import React from "react";
import $ from "jquery";
import axios from "axios";
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'
import NavbarKasir from "./navbar";

export default class Pemesanan extends React.Component {
    constructor() {
        super()
        this.state = {
            menu: [],
            meja: [],
            menus: [],
            action: "",
            token: "",
            id_transaksi: 0,
            tgl_transaksi: '',
            id_user: 0,
            id_meja: 0,
            nama_pelanggan: '',
            status: '',
            jenis_pesanan: '',
            cart: [],
            total: [],
        }
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

    getMeja = () => {
        let url = "http://localhost:4040/kasir/meja/status/tersedia"
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

    Add = () => {
        $("#modal_transaksi").show()
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({
            id_transaksi: 0,
            tgl_transaksi: '',
            id_meja: 0,
            id_user: user.id_user,
            nama_pelanggan: '',
            status: 'belum_lunas',
            jenis_pesanan: '',
        })
    }
    AddDetail = (value) => {
        axios
            .get("http://localhost:4040/kasir/menu/" + value.id_menu, this.headerConfig())
            .then((res) => {
                if (this.state.cart.length === 0) {
                    const keranjang = {
                        id_menu: value.id_menu,
                        qty: 1
                    }
                    this.state.cart.push(keranjang)
                    this.state.menus.push(res.data.data)
                } else if (this.state.cart.find(item => item.id_menu === value.id_menu)) {
                    this.state.cart.find(item => item.id_menu === value.id_menu).qty++
                } else if (this.state.cart.find(item => item.id_menu !== value.id_menu)) {
                    const keranjang = {
                        id_menu: value.id_menu,
                        qty: 1
                    }
                    this.state.cart.push(keranjang)
                    this.state.menus.push(res.data.data)
                }
                // const menuId = value.id_menu; // id menu yang dicari
                // const order = this.state.cart.find(order => order.id_menu === menuId);// mencari objek dengan id menu yang dicari
                // const qty = order.qty;
                // this.setState({
                //     qty: qty
                // })
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
    // getTotalBayar(itemId) {
    //     var item = []
    //     item.push(this.state.cart.find((item) => item.id_menu === itemId))
    //     var menu = []
    //     menu.push(this.state.menus.find((item) => item.id_menu === itemId))
    //     var totalBayar = 0
    //     for (var i = 0; i < item.length; i++) {
    //         totalBayar += menu[i].harga * item[i].qty
    //     }
    //     return totalBayar
    // }
    saveTransaksi = (event) => {
        event.preventDefault()
        $("#modal_transaksi").show()
        let sendData = {
            id_transaksi: this.state.id_transaksi,
            tgl_transaksi: this.state.tgl_transaksi,
            id_user: this.state.id_user,
            id_meja: this.state.id_meja,
            nama_pelanggan: this.state.nama_pelanggan,
            status: this.state.status,
            jenis_pesanan: this.state.jenis_pesanan,
            detail_transaksi: this.state.cart
        }
        let data = {
            id_meja: this.state.id_meja,
            status_meja: "tidak_tersedia"
        }
        let url = "http://localhost:4040/kasir/pemesanan"
        if (this.state.jenis_pesanan === "ditempat") {
            axios.post(url, sendData, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    axios.put("http://localhost:4040/kasir/meja/", data, this.headerConfig())
                    window.location = '/kasir/riwayat'
                    this.getMenu()

                })
                .catch(error => console.log(error))
        } else if (this.state.jenis_pesanan === "dibungkus") {
            axios.post(url, sendData, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    window.location = '/kasir/riwayat'
                    this.getMenu()
                })
                .catch(error => console.log(error))
        }
        $("#modal_transaksi").hide()
    }
    dropTransaksi = selectedItem => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let url = "http://localhost:4040/kasir/pemesanan/" + selectedItem.id_transaksi
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMenu()
                })
                .catch(error => console.log(error))
        }
    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount() {
        this.getMenu()
        this.getMeja()
    }
    close = () => {
        $("#modal_transaksi").hide()
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
                                    Home
                                </a>
                            </li>
                            <li aria-current="page">
                                <div class="flex items-center">
                                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Menu</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="m-3 h-screen" style={{ fontFamily: "modern sans" }}>
                        <div className="flex justify-between mb-2 bg-gray-700 text-white p-1.5 rounded-xl items-center">
                            <h1 className="ml-4 font-extrabold text-3xl text-lime-500 tracking-wider">Daftar Menu</h1>
                            <button className="hover:bg-lime-600 bg-lime-500 text-white font-bold uppercase text-xs px-4 py-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 tracking-widest" type="button" onClick={() => this.Add()}>
                                Pesan
                            </button>
                        </div>
                        <div className="grid grid-cols-5 bg-gray-700 rounded-xl">
                            {this.state.menu.map((item) => (
                                <div class="max-w-sm bg-white border m-3 border-gray-200 rounded-xl shadow dark:bg-slate-600 dark:border-gray-700" key={item.id_menu}>
                                    <div className="p-4">
                                        <img class="rounded-3xl" src={`http://localhost:4040/img/${item.gambar}`} alt="gambar" />
                                    </div>
                                    <div class="p-5 text-center">
                                        <h5 class="mb-2 text-2xl font-bold tracking-wide text-gray-900 dark:text-white">{item.nama_menu}</h5>
                                        <p class="mb-6 font-normal text-gray-700 dark:text-gray-300 tracking-normal">{this.convertToRupiah(item.harga)}</p>
                                        <button type="button" onClick={() => this.handleMinus(item)} class="text-white bg-lime-500 hover:bg-lime-600 focus:ring-2 focus:outline-none focus:ring-lime-300 font-semibold rounded-2xl text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-800">
                                            <HiOutlineMinus size={15}><span class="sr-only">Kurang</span></HiOutlineMinus>
                                        </button>
                                        <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-gray-700">
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

                {/* Modal */}
                <div id="modal_transaksi" tabindex="-1" aria-hidden="true" class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50">
                    <div class="flex lg:h-auto w-auto justify-center" style={{fontFamily: "modern sans"}}>
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-auto">
                            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-lime-500 dark:hover:text-white" onClick={() => this.close()}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Tutup modal</span>
                            </button>
                            <div class="px-6 py-6 lg:px-8">
                                <h3 class="text-xl mb-5 font-bold text-gray-900 dark:text-white">Pemesanan</h3>
                                <div class="space-y-6">
                                    {/* {this.state.menus.map((item,index) => (
                                        <div className="px-6 py-4" key={index}>
                                            Total Bayar: {this.convertToRupiah(this.getTotalBayar(item.id_menu))}
                                        </div>
                                    ))} */}
                                    <table class="w-full text-sm rounded-xl text-left text-gray-500 dark:text-white">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-lime-500 dark:text-white">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Nama Menu
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Harga
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    qty
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.menus.map((item) => (
                                                <tr class="bg-white border-b font-sans dark:bg-slate-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id_menu}>
                                                    <td class="px-6 py-4">
                                                        {item.nama_menu}
                                                    </td>
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
                                </div>
                                <form class="space-y-6 mt-6" onSubmit={(event) => this.saveTransaksi(event)}>
                                    <div>
                                        <label for="nama_pelanggan" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Nama Pelanggan</label>
                                        <input type="text" name="nama_pelanggan" id="nama_pelanggan" value={this.state.nama_pelanggan} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-600 dark:border-none dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan nama pelanggan" required />
                                    </div>
                                    <div>
                                        <label for="jenis" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Jenis Pesanan</label>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-600 dark:border-none dark:placeholder-gray-400 dark:text-white" placeholder="Jenis Pesanan" name="jenis_pesanan" value={this.state.jenis_pesanan} onChange={this.bind} required>
                                            <option value=''>Pilih Jenis Pesanan</option>
                                            <option value="ditempat">Makan Ditempat</option>
                                            <option value="dibungkus">Dibungkus</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label for="jenis" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Meja</label>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-600 dark:border-none dark:placeholder-gray-400 dark:text-white" placeholder="Jenis Pesanan" name="id_meja" value={this.state.id_meja} onChange={this.bind} required>
                                            <option value="">Pilih Meja</option>
                                            {this.state.meja.map(item => (
                                                <option value={item.id_meja}>{item.nomor_meja}: {item.status_meja}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-500 dark:hover:bg-lime-700 dark:focus:ring-lime-800">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}