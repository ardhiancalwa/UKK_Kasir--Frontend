import React from "react";
import axios from "axios";
import background from "../img/login.jpg"
import logo from "../img/logo.png";
import hutan from "../img/hutan.jpg"

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
            window.location = '/kasir/pemesanan'
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
      <div>
        <section className="min-h-screen flex items-stretch text-white">
          <div className="lg:flex sm:flex md:flex w-2/3 hidden bg-no-repeat bg-cover relative items-center" style={{ backgroundImage: `url(${background})` }}>
            <div className="w-full px-24 z-10">
              <img src={logo} alt="logo" />
            </div>
            <div className="bottom-0 absolute p-4 text-center right-0 left-0 justify-center space-x-4">
              <span>
                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </span>
              <span>
                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
              </span>
              <span>
                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </span>
            </div>
          </div>

          <div className="grid w-full py-6 z-20 content-center" style={{ fontFamily: "poppins" }}>
            <h1 className="font-bold text-3xl ml-28" style={{ color: "#1E1E1E" }}>Masuk</h1>
            <p className="font-medium text-lg ml-28" style={{ color: "#1E1E1E" }}>Masukkan username dan password</p>
            <form action="" className="sm:w-2/3 mt-3 w-full px-4 lg:px-0 ml-28" onSubmit={ev => this.handleLogin(ev)}>
              <div>
                <label for="small-input" class="text-lg block mb-2 font-semibold" style={{ color: "#1E1E1E" }}>Username</label>
                <input type="text" id="username" name="username" onChange={this.bind} value={this.state.username} required  class="block w-full p-2 border rounded-xl bg-gray-50 sm:text-sm font-semibold dark:bg-gray-700 dark:border-amber-50 dark:placeholder-gray-400 dark:focus:ring-amber-100 dark:focus:border-amber-100" style={{backgroundColor: "#E1D7C6", color:"#1E1E1E"}}/>
              </div>
              <div className="mt-3">
                <label for="small-input" class="text-lg block mb-2 font-semibold" style={{ color: "#1E1E1E" }}>Password</label>
                <input type="password" id="password" name="password" class="block w-full p-2 border rounded-xl bg-gray-50 sm:text- font-semibold dark:bg-gray-700 dark:border-amber-50 dark:placeholder-gray-400 dark:focus:ring-amber-100 dark:focus:border-amber-100" onChange={this.bind} value={this.state.password} required style={{backgroundColor: "#E1D7C6", color:"#1E1E1E"}}/>
              </div>
              <button type="submit" class="mt-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-semibold rounded-full text-sm px-6 py-2.5 text-center mr- mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" style={{backgroundColor: "#61764B"}}>Masuk</button>
            </form>
          </div>
        </section>
      </div>
      // <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12" style={{backgroundColor:"#ECE8DD"}}>
      //   <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      //     <div
      //       class="absolute inset-0 bg-gradient-to-r from-orange-300 to-lime-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      //     </div>
      //     <div class="w-96 h-96 relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      //       <div class="max-w-md mx-auto">
      //         <div>
      //           <h1 class="text-center text-4xl font-extrabold dark:text-black"><span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-200 from-lime-700">Masuk</span></h1>
      //         </div>
      //         <form class="divide-y divide-gray-200" onSubmit={ev => this.handleLogin(ev)}>
      //           <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
      //             <div class="relative mb-8">
      //               <input type="text" id="username" name="username" placeholder="Masukkan Username"  onChange={this.bind} value={this.state.username} required class="focus:outline-none rounded-lg peer placeholder-transparent h-10 w-full focus:border-b-2 border-green-400 text-gray-900  focus:borer-rose-600"/>
      //               <label for="usernmae" class="absolute left-0 -top-6 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 ml-3 peer-placeholder-shown:top-2 transition-all peer-focus:-top-6 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
      //             </div>
      //             <div class="relative">
      //               <input id="password" type="password" name="password" placeholder="Password" onChange={this.bind} value={this.state.password} required class="focus:outline-none peer placeholder-transparent h-10 w-full rounded-lg focus:border-b-2 border-green-400 text-gray-900  focus:borer-rose-600"/>
      //               <label for="password" class="absolute left-0 -top-6 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 ml-3 peer-placeholder-shown:top-2 transition-all peer-focus:-top-6 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
      //             </div>
      //             <div class="relative">
      //               <button class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Submit</button>
      //             </div>
      //           </div>
      //         </form>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    )
  }
}