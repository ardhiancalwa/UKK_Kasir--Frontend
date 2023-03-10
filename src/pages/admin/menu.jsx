import React from "react";
import $ from "jquery";
import axios from "axios";
import { FiEdit3 } from "react-icons/fi";
import { RiEditCircleFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import NavbarAdmin from "./navbar";


export default class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            menu: [],
            action: "",
            token: "",
            id_menu: 0,
            nama_menu: '',
            jenis: '',
            deskripsi: '',
            gambar: null,
            harga: '',
            fillPassword: true
        }
        let user = JSON.parse(localStorage.getItem('user'))
        if (localStorage.getItem("token") && user.role === 'admin') {
            this.state.token = localStorage.getItem("token")
        } else {
            window.alert("Maaf, anda bukan admin")
            window.location = "/"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
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

    getNamaMenu = (event) => {
        event.preventDefault()
        let url = "http://localhost:4040/kasir/menu/menu/" + this.state.nama_menu
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

    Add = () => {
        $("#modal_menu").show()
        this.setState({
            id_menu: 0,
            nama_menu: '',
            jenis: '',
            deskripsi: '',
            gambar: null,
            harga: '',
            action: "insert",
            fillPassword: true
        })
    }
    Edit = selectedItem => {
        $("#modal_menu").show()
        this.setState({
            id_menu: selectedItem.id_menu,
            nama_menu: selectedItem.nama_menu,
            jenis: selectedItem.jenis,
            deskripsi: selectedItem.deskripsi,
            gambar: null,
            harga: selectedItem.harga,
            action: "update"
        })
    }
    saveMenu = (event) => {
        event.preventDefault()
        $("#modal_menu").show()
        let form = new FormData()
        form.append("id_menu", this.state.id_menu)
        form.append("nama_menu", this.state.nama_menu)
        form.append("jenis", this.state.jenis)
        form.append("deskripsi", this.state.deskripsi)
        form.append("gambar", this.state.gambar)
        form.append("harga", this.state.harga)
        let url = "http://localhost:4040/kasir/menu"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMenu()
                })
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMenu()
                })
                .catch(error => console.log(error))
        }
        $("#modal_menu").hide()
    }
    dropMenu = selectedItem => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let url = "http://localhost:4040/kasir/menu/" + selectedItem.id_menu
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMenu()
                })
                .catch(error => console.log(error))
        }
    }

    handleFile = (event) => {
        this.setState({
            gambar: event.target.files[0]
        })
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount() {
        this.getMenu()
    }
    close = () => {
        $("#modal_menu").hide()
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
            <div>
                <NavbarAdmin />
                <nav class="flex px-5 py-1 text-gray-700 bg-gray-50 dark:bg-transparent " aria-label="Breadcrumb">
                    <ol class="inline-flex mt-16 items-center space-x-1 md:space-x-3">
                        <li class="inline-flex items-center">
                            <a href="/admin/home" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Beranda
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
                        <div className="flex">
                            <form className="mr-2" onSubmit={(event) => this.getNamaMenu(event)}>
                                <button type="button" data-collapse-toggle="search" aria-controls="search" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Search</span>
                                </button>
                                <div class="hidden md:block">
                                    <input type="search" id="search" class="block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" placeholder="Cari..." name="nama_menu" onChange={this.bind} required/>
                                </div>
                            </form>
                            <button className="hover:bg-lime-600 bg-lime-500 text-white font-bold uppercase text-xs px-4 py-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 tracking-wider" type="button" onClick={() => this.Add()}>
                                Tambah Menu
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 bg-gray-700 rounded-xl">
                        {this.state.menu.map(item => (
                            <div class="max-w-sm bg-white m-4 border border-gray-200 rounded-lg shadow dark:bg-slate-600 dark:border-gray-700">
                                <div href="#" className="p-4">
                                    <img class="rounded-3xl" src={`http://localhost:4040/img/${item.gambar}`} alt="" />
                                </div>
                                <div class="pl-5 pr-5">
                                    <a href="#">
                                        <h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white tracking-widest">{item.nama_menu}</h5>
                                    </a>
                                    <p class="mb-1 font-normal text-gray-700 dark:text-gray-400"><span className="text-gray-200 tracking-wide">Deskripsi:</span> {item.deskripsi}</p>
                                    <p class="mb-1 font-normal text-gray-700 dark:text-gray-400"><span className="text-gray-200 tracking-wide">Jenis:</span> {item.jenis}</p>
                                    <p class="font-normal text-gray-700 dark:text-gray-400"><span className="text-gray-200 tracking-wide">Harga:</span> {this.convertToRupiah(item.harga)}</p>
                                    <div className="text-start float-left pb-5 pt-8 flex">
                                        <button data-tooltip-target="tooltip-edit" data-tooltip-placement="bottom" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-3 dark:bg-emerald-400 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700" onClick={() => this.Edit(item)}>
                                            <FiEdit3 size={18} />
                                            <span class="sr-only">Edit</span>
                                        </button>
                                        <div id="tooltip-edit" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-emerald-600">
                                            Edit
                                            <div class="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                        <button data-tooltip-target="tooltip-hapus" data-tooltip-placement="bottom" type="button" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => this.dropMenu(item)}>
                                            <MdDelete size={18} />
                                            <span class="sr-only">Hapus</span>
                                        </button>
                                        <div id="tooltip-hapus" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-red-600">
                                            Hapus
                                            <div class="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Modal */}
                <div id="modal_menu" tabindex="-1" aria-hidden="true" class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50">
                    <div class="flex lg:h-auto w-auto justify-center" style={{ fontFamily: "modern sans" }}>
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-600 w-1/3">
                            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-lime-500 dark:hover:text-white" onClick={() => this.close()}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Tutup modal</span>
                            </button>
                            <div class="px-6 py-6 lg:px-8">
                                <h3 class="mb-4 text-xl font-bold text-gray-900 dark:text-white tracking-widest">Edit Daftar Menu</h3>
                                <form class="space-y-6" onSubmit={(event) => this.saveMenu(event)}>
                                    <div className="tracking-wider">
                                        <label for="nama_menu" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Nama Menu</label>
                                        <input type="text" name="nama_menu" id="nama_menu" value={this.state.nama_menu} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:focus:ring-lime-500 dark:focus:border-lime-700 block w-full p-2.5 dark:border-none dark:bg-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan nama menu" required />
                                    </div>
                                    <div className="tracking-wider">
                                        <label for="jenis" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Jenis Menu</label>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-700 block w-full p-2.5 dark:bg-gray-500 dark:border-none dark:placeholder-gray-400 dark:text-white" placeholder="Jenis Menu" name="jenis" value={this.state.jenis} onChange={this.bind} required>
                                            <option value="">Pilih Jenis Menu</option>
                                            <option value="makanan">Makanan</option>
                                            <option value="minuman">Minuman</option>
                                        </select>
                                    </div>
                                    <div className="tracking-wider">
                                        <label for="deskripsi" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Deskripsi</label>
                                        <input type="text" name="deskripsi" id="deskripsi" value={this.state.deskripsi} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-700 block w-full p-2.5 dark:bg-gray-500 dark:border-none dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan deskripsi menu" required />
                                    </div>
                                    <div className="tracking-wider">
                                        <label for="gambar" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Gambar</label>
                                        <input type="file" name="gambar" id="gambar" placeholder="Pilih gambar menu" onChange={this.handleFile} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-700 block w-full px-2 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div className="tracking-wider">
                                        <label for="harga" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Harga</label>
                                        <input type="text" name="harga" id="harga" value={this.state.harga} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-700 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan harga menu" required />
                                    </div>

                                    <button type="submit" class="w-full text-white bg-lime-500 hover:bg-lime-600 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-lime-800 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}