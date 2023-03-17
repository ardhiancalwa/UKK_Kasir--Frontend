import React from "react";
import axios from "axios";
import { a } from "react-router-dom";
import {HiUserCircle} from "react-icons/hi"

export default class NavbarManajer extends React.Component {
  Navbar = (a) => {
    if (a === 'home') {
      window.location = '/manajer/home'
    } else if (a === 'laporan') {
      window.location = '/manajer/laporan'
    }
  }
  Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location = "/"
  }
  getNama = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user.nama_user !== null) {
      return user.nama_user
    } else {
      return "tidak ada"
    }
  }
  render() {
    return (
      <div>
        <nav class="bg-white border-gray-200 rounded">
          <div class="container flex flex-wrap items-center justify-between mx-auto  my-auto px-2 -mt-2  sm:px-4 sm:py-1 py-0.5 dark:bg-gray-600 fixed">
            <a href="https://flowbite.com/" class="flex items-center">
              <img src="/logo.png" class="h-6 mr-3 sm:h-9" alt="Wikusama Logo" />
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Wikusama</span>
            </a>
            <div class="flex md:order-2 tracking-wider" style={{fontFamily: "modern sans"}}>
              <h2><span class="bg-blue-100 text-blue-800 text-base font-semibold inline-flex items-center px-4 py-2 rounded-xl dark:bg-gray-700 dark:text-white" >
                <HiUserCircle size={22} className="mr-1" />
                {this.getNama()}
              </span></h2>
              <div>
                <button data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" type="button" class="text-white ml-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => this.Logout()}>
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                <div id="tooltip-bottom" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                  Keluar
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
              {/* <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-6 mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => this.Logout()}>Keluar</button> */}
              <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                <span class="sr-only">Open menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
              <div class="relative mt-3 md:hidden">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500" placeholder="Search..." />
              </div>
              <ul class="flex flex-col p-4 mt-4 border border-gray-100 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-600 md:dark:bg-gray-600">
                <li>
                  <a href="#" onClick={() => this.Navbar('laporan')} class="flex text-white bg-blue-700  md:bg-transparent md:text-blue-700 md:p-0 dark:text-white hover:bg-lime-500 active:bg-lime-500 hover:box-content rounded-md h-10 w-36 justify-center items-center" aria-current="page"></a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}