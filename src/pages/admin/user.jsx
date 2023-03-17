import React from "react";
import $ from "jquery";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri"
import { FiEdit3 } from "react-icons/fi";
import Navbar from "./navbar";

export default class User extends React.Component {
  constructor() {
    super()
    this.state = {
      user: [],
      action: "",
      token: "",
      id_user: 0,
      nama_user: "",
      role: "",
      username: "",
      password: "",
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
  getUser = () => {
    $("#dropdown").hide()
    let url = "http://localhost:4040/kasir/user"
    axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({ user: response.data.data })
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

  getUserRole = (role) => {
    $("#dropdown").hide()
    let url = "http://localhost:4040/kasir/user/role/" + role
    axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({ user: response.data.data })
      })
      .catch(error => {
        if (error.response) {
          if (error.response.role) {
            window.alert(error.response.data.message)
            window.location = '/'
          }
        } else {
          console.log(error);
        }
      })
  }
  Add = () => {
    $("#modal_user").show()
    this.setState({
      id_user: 0,
      nama_user: "",
      role: "",
      username: "",
      password: "",
      fillpassword: true,
      action: "insert"
    })
  }
  Edit = (selectedItem) => {
    $("#modal_user").show()
    this.setState({
      action: "update",
      id_user: selectedItem.id_user,
      nama_user: selectedItem.nama_user,
      role: selectedItem.role,
      username: selectedItem.username,
    })
  }
  saveUser = (event) => {
    event.preventDefault()
    $("#modal_user").show()
    let sendData = {
      id_user: this.state.id_user,
      nama_user: this.state.nama_user,
      role: this.state.role,
      username: this.state.username,
      password: this.state.password
    }
    let url = "http://localhost:4040/kasir/user"
    if (this.state.action === "insert") {
      axios.post(url, sendData, this.headerConfig())
        .then(response => {
          window.alert(response.data.message)
          this.getUser()
        })
    } else if (this.state.action === "update") {
      axios.put(url, sendData, this.headerConfig())
        .then(response => {
          window.alert(response.data.message)
          this.getUser()
        })
        .catch(error => console.log(error))
    }
    $("#modal_user").hide()
  }
  dropUser = selectedItem => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      let url = "http://localhost:4040/kasir/user/" + selectedItem.id_user
      axios.delete(url, this.headerConfig())
        .then(response => {
          window.alert(response.data.message)
          this.getUser()
        })
        .catch(error => console.log(error))
    }
  }
  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  componentDidMount() {
    this.getUser()
  }
  role = () => { //?
    $('#dropdown').show()
    $('#icon2').show()
    $('#icon1').hide()
  }

  roleTutup = () => {
    $('#dropdown').hide()
    $('#icon1').show()
    $('#icon2').hide()
  }
  close = () => {
    $("#modal_user").hide()
  }

  render() {
    return (
      <div >
        <Navbar />
        <nav class="flex px-5 py-1 text-gray-700  bg-gray-50 dark:bg-transparent " aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3 mt-16">
            <li class="inline-flex items-center">
              <a href="/admin/home" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                Beranda
              </a>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Pengguna</span>
              </div>
            </li>
          </ol>
        </nav>
        <div className="m-3 h-screen" style={{ fontFamily: "modern sans" }}>
          <div className="flex justify-between mb-2 bg-gray-700 text-white p-1.5 rounded-xl items-center">
            <h1 className="ml-4 font-bold text-3xl text-lime-500 tracking-wider">Daftar Pengguna</h1>
            <button className="hover:bg-lime-600 bg-lime-500 text-white font-bold uppercase text-xs px-4 py-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 tracking-wider" type="button" onClick={() => this.Add()}>
              Tambah Pengguna
            </button>
          </div>
          <div class=" overflow-x-auto shadow-md sm:rounded-lg tracking-wide">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-300">
              <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-slate-700 border-b dark:border-gray-600 dark:text-white">
                <tr>
                  <th scope="col" class="px-6 py-3 tracking-wider">
                    Nama
                  </th>
                  <th scope="col" class="px-6 py-3 tracking-wider">
                    Nama Pengguna
                  </th>
                  <th scope="col" class="px-6 py-3 flex items-center tracking-wider">
                    Jabatan
                    <a href="#" onClick={() => this.role()} id="icon1"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg></a>
                    <a href="#" onClick={() => this.roleTutup()} id="icon2" className="hidden"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg></a>
                  </th>
                  <div id="dropdown" class="z-10 hidden fixed bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-slate-700">
                    <ul class="py-2 text-sm  text-white dark:text-white" aria-labelledby="dropdownDefaultButton">
                      <li>
                        <a href="#" onClick={() => this.getUser()} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 dark:hover:text-white">Tampilkan Semua</a>
                      </li>
                      <li>
                        <a href="#" onClick={() => this.getUserRole("manajer")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 dark:hover:text-white">Manajer</a>
                      </li>
                      <li>
                        <a href="#" onClick={() => this.getUserRole("admin")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 dark:hover:text-white">Admin</a>
                      </li>
                      <li>
                        <a href="#" onClick={() => this.getUserRole("kasir")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 dark:hover:text-white">Kasir</a>
                      </li>
                    </ul>
                  </div>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Hapus</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.user.map((item) => (
                  <tr class="bg-white border-b dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.nama_user}
                    </th>
                    <td class="px-6 py-4">
                      {item.username}
                    </td>
                    <td class="px-6 py-4 ">
                      {item.role}
                    </td>

                    <td class="px-0 py-4">
                      <a data-tooltip-target="tooltip-editUser" data-tooltip-placement="right" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-emerald-400 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700" onClick={() => this.Edit(item)}>
                        <FiEdit3 size={15} />
                        <span class="sr-only">Edit</span>
                      </a>
                      <div id="tooltip-editUser" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-emerald-600">
                        Edit
                        <div class="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    </td>
                    <td class="px-0 py-4">
                      <a data-tooltip-target="tooltip-hapusUser" data-tooltip-placement="right" type="button" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => this.dropUser(item)}>
                        <MdDelete size={15} />
                        <span class="sr-only">Hapus</span>
                      </a>
                      <div id="tooltip-hapusUser" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-red-600">
                        Hapus
                        <div class="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Modal */}
          <div id="modal_user" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50">
            <div class="flex md:h-auto w-auto justify-center ">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-lime-500 dark:hover:text-white" onClick={() => this.close()}>
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Tutup modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                  <h3 class="mb-4 text-xl font-bold text-gray-900 dark:text-white tracking-widest">Edit Daftar Pengguna</h3>
                  <form class="space-y-6" onSubmit={(event) => this.saveUser(event)}>
                    <div>
                      <label for="nama_user" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Nama</label>
                      <input type="text" name="nama_user" id="nama_user" value={this.state.nama_user} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-600 dark:border-none dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan nama anda" required />
                    </div>
                    <div>
                      <label for="role" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Jabatan</label>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-600 dark:border-none dark:placeholder-gray-400 dark:text-white" placeholder="Role" name="role" value={this.state.role} onChange={this.bind} required>
                        <option value="">Pilih Jabatan</option>
                        <option value="manajer">Manajer</option>
                        <option value="admin">Admin</option>
                        <option value="kasir">Kasir</option>
                      </select>
                    </div>
                    <div>
                      <label for="username" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Username</label>
                      <input type="text" name="username" id="username" value={this.state.username} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-600 dark:border-none dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan username anda" required />
                    </div>
                    <div>
                      <label for="password" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white tracking-wider">Password</label>
                      <input type="password" name="password" id="password" value={this.state.password} placeholder="Masukkan Password" onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-600 dark:border-none dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-500 dark:hover:bg-lime-700 dark:focus:ring-lime-800 tracking-widest">Simpan</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    )
  }
}