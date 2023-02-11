import React from "react";
import $ from "jquery";
import axios from "axios";
import Navbar from "../../components/navbar";

export default class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            menu: [],
            action: "",
            id_menu: 0,
            nama_menu: '',
            jenis: '',
            deskripsi: '',
            gambar: null,
            harga: ''
        }
    }
    getMenu = () => {
        let url = "http://localhost:4040/kasir/menu/"
        axios.get(url)
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
            action: "insert"
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
            axios.post(url, form)
                .then(response => {
                    window.alert(response.data.message)
                    this.getMenu()
                })
        } else if (this.state.action === "update") {
            axios.put(url, form)
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
            axios.delete(url)
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
            <div className='flex h-screen w-full'>
                <div class="w-full h-screen">
                    <Navbar />
                    <div class=" relative mt-20 overflow-x-auto shadow-md sm:rounded-lg m-2">
                        <h2 className="dark:text-white mb-6 text-xl font-sans ml-3">Daftar Menu
                            <button className="hover:bg-green-500 float-right mr-3 bg-green-600 text-white font-bold uppercase text-xs px-4 py-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.Add()}>
                                Tambah Menu
                            </button>
                        </h2>
                        <div className="grid grid-cols-4">
                            {this.state.menu.map(item => (
                                <div class="max-w-sm bg-white border m-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={item.id_menu}>

                                    <img class="rounded-t-lg" src={`http://localhost:4040/img/${item.gambar}`} alt="gambar" />
                                    <div class="p-5">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.nama_menu}</h5>
                                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Jenis: {item.jenis}</p>
                                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Deskripsi: {item.deskripsi}</p>
                                        <p class="mb-6 font-normal text-gray-700 dark:text-gray-400">Harga: {this.convertToRupiah(item.harga)}</p>
                                        <div className="text-start flex">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4" onClick={() => this.Edit(item)}>Edit</a>
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => this.dropMenu(item)}>Hapus</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Modal */}
                <div id="modal_menu" tabindex="-1" aria-hidden="true" class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50">
                    <div class="flex lg:h-auto w-auto justify-center ">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
                            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => this.close()}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Tutup modal</span>
                            </button>
                            <div class="px-6 py-6 lg:px-8">
                                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Menu</h3>
                                <form class="space-y-6" onSubmit={(event) => this.saveMenu(event)}>
                                    <div>
                                        <label for="nama_menu" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Menu</label>
                                        <input type="text" name="nama_menu" id="nama_menu" value={this.state.nama_menu} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan nama menu" required />
                                    </div>
                                    <div>
                                        <label for="jenis" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Menu</label>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Jenis Menu" name="jenis" value={this.state.jenis} onChange={this.bind} required>
                                            <option value="">Pilih Jenis Menu</option>
                                            <option value="makanan">Makanan</option>
                                            <option value="minuman">Minuman</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label for="deskripsi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
                                        <input type="text" name="deskripsi" id="deskripsi" value={this.state.deskripsi} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan deskripsi menu" required />
                                    </div>
                                    <div>
                                        <label for="gambar" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gambar</label>
                                        <input type="file" name="gambar" id="gambar" placeholder="Pilih gambar menu" onChange={this.handleFile} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label for="harga" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
                                        <input type="text" name="harga" id="harga" value={this.state.harga} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan harga menu" required />
                                    </div>
                                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}