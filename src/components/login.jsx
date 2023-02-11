import React from "react";
import axios from "axios";

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      role: "",
      message: "",
      fillPassword: true,
      logged: true
    }
  }
  bind = (event) => {
    // document.getElementById('password').style.visibility = ""
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = event => {
    event.preventDefault()
    this.state.fillPassword = false
    let sendData = {
      username: this.state.username,
      password: this.state.password
    }
    let url = "http://localhost:4040/kasir/user/login"
    axios.post(url, sendData)
      .then(res => {
        this.setState({ logged: res.data.logged })
        if (this.state.logged) {
          let user = res.data.data
          let token = res.data.token
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", token)
          this.state.role = user.role

          if (this.state.role === "admin") {
            window.location = '/admin/user'
          } else if (this.state.role === "kasir") {
            window.location = '/admin/pemesanan'
          } else if (this.state.role === "manajer") {
            window.location = '/manajer'
          }
        }
        else {
          window.alert(res.data.message)
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            class="absolute inset-0 bg-gradient-to-r from-green-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div class="w-96 h-96 relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <div>
                <h1 class="text-center text-4xl font-extrabold dark:text-black"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Masuk</span></h1>
              </div>
              <form class="divide-y divide-gray-200" onSubmit={ev => this.handleLogin(ev)}>
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div class="relative mb-8">
                    <input type="text" id="username" name="username" placeholder="Masukkan Username"  onChange={this.bind} value={this.state.username} required class="focus:outline-none rounded-lg peer placeholder-transparent h-10 w-full focus:border-b-2 border-green-400 text-gray-900  focus:borer-rose-600"/>
                    <label for="usernmae" class="absolute left-0 -top-6 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 ml-3 peer-placeholder-shown:top-2 transition-all peer-focus:-top-6 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                  </div>
                  <div class="relative">
                    <input id="password" type="password" name="password" placeholder="Password" onChange={this.bind} value={this.state.password} required class="focus:outline-none peer placeholder-transparent h-10 w-full rounded-lg focus:border-b-2 border-green-400 text-gray-900  focus:borer-rose-600"/>
                    <label for="password" class="absolute left-0 -top-6 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 ml-3 peer-placeholder-shown:top-2 transition-all peer-focus:-top-6 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                  </div>
                  <div class="relative">
                    <button class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}