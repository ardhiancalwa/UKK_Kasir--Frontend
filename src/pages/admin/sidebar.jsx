import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineFastfood } from "react-icons/md";
import { HiOutlineTableCells } from "react-icons/hi2";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";

export default class Sidebar extends React.Component {
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/"
    }
    render() {
        return (
            // <div>
            //     <div x-data="setup()" x-init="$refs.loading.classList.add('hidden');">
            //         <div className="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
            //             <div x-ref="loading" className="fixed inset-0 z-50 flex items-center justify-center text-2xl font-semibold text-white bg-blue-600">
            //                 Loading......
            //             </div>
            //             <div x-transition:enter="transform transition-transform duration-300"
            //                 x-transition:enter-start="-translate-x-full"
            //                 x-transition:enter-end="translate-x-0"
            //                 x-transition:leave="transform transition-transform duration-300"
            //                 x-transition:leave-start="translate-x-0"
            //                 x-transition:leave-end="-translate-x-full"
            //                 x-show="isSidebarOpen"
            //                 className="fixed inset-y-0 z-10 flex w-80">
            //                 <svg class="absolute inset-0 w-full h-full text-white"
            //                     style="filter: drop-shadow(10px 0 10px #00000030)"
            //                     preserveAspectRatio="none"
            //                     viewBox="0 0 309 800"
            //                     fill="currentColor"
            //                     xmlns="http://www.w3.org/2000/svg">
            //                     <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
            //                 </svg>
            //                 <div className="z-10 flex flex-col flex-1">
            //                     <div className="flex items-center justify-between flex-shrink-0 w-64 p-4">
            //                         <a href="#">
            //                             <span className="sr-only">K-UI</span>
            //                             <svg aria-hidden="true"
            //                                 class="w-16 h-auto text-blue-600"
            //                                 viewBox="0 0 96 53"
            //                                 fill="currentColor"
            //                                 xmlns="http://www.w3.org/2000/svg">
            //                                 <path fill-rule="evenodd"
            //                                     clip-rule="evenodd"
            //                                     d="M7.69141 34.7031L13.9492 28.1992L32.0898 52H40.1758L18.4492 23.418L38.5938 0.8125H30.4375L7.69141 26.125V0.8125H0.941406V52H7.69141V34.7031ZM35.3008 26.9102H52.457V21.6016H35.3008V26.9102ZM89.1914 13V35.5117C89.1914 39.2148 88.1719 42.0859 86.1328 44.125C84.1172 46.1641 81.1992 47.1836 77.3789 47.1836C73.6055 47.1836 70.6992 46.1641 68.6602 44.125C66.6211 42.0625 65.6016 39.1797 65.6016 35.4766V0.8125H58.9219V35.6875C58.9688 40.9844 60.6562 45.1445 63.9844 48.168C67.3125 51.1914 71.7773 52.7031 77.3789 52.7031L79.1719 52.6328C84.3281 52.2578 88.4062 50.5352 91.4062 47.4648C94.4297 44.3945 95.9531 40.4453 95.9766 35.6172V13H89.1914ZM89 8H96V1H89V8Z" />
            //                             </svg>
            //                         </a>
            //                         <button className="p-1 rounded-lg focus:outline-none focus:ring">
            //                             <svg class="w-6 h-6"
            //                                 aria-hidden="true"
            //                                 xmlns="http://www.w3.org/2000/svg"
            //                                 fill="none"
            //                                 viewBox="0 0 24 24"
            //                                 stroke="currentColor">
            //                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            //                             </svg>
            //                             <span className="sr-only">Close sidebar</span>
            //                         </button>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>

            <div>
                <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-16 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div class="h-full px-3 py-4 overflow-y-auto" style={{backgroundColor: "#61764B"}}>
                        <a href="#" class="flex items-center pl-1.5 mb-5">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png" class="h-6 mr-6 sm:h-7" alt="Logo Kasir Kafe" />
                        </a>
                        <ul class="space-y-2">
                            <li>
                                <Link to="/admin/menu" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-black">
                                    <MdOutlineFastfood className="ml-0.5" size={20} />
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/meja" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-black">
                                    <HiOutlineTableCells className="ml-0.5" size={20} />
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/user" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-black">
                                    <AiOutlineUser className="ml-0.5" size={20}/>
                                </Link>
                            </li>
                        </ul>
                        <ul class="pt-2 mt-96 space-y-2 border-t border-white dark:border-white">
                            <li>
                                <Link to="" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-black" onClick={() => this.Logout()}>
                                    <BiLogOutCircle className="ml-0.5" size={20}/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        )
    }
}


// import React from "react"
// import { Link } from "react-router-dom"

// export default class Sidebar extends React.Component {
//     Logout = () => {
//         localStorage.removeItem("token")
//         localStorage.removeItem("user")
//         window.location = "/"
//     }
//     render() {
//         return (
//             <div class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full fixed z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
//                 <div class="container flex flex-wrap items-center justify-between mx-auto">
//                     <div class="flex items-center">
//                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png" class="h-6 mr-3 sm:h-9" alt="Logo" />
//                         <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Wikusama Kafe</span>
//                     </div>
//                     <div class="flex md:order-2">
//                         <a href="#" class="mr-3 block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={() => this.Logout()}>Keluar</a>
//                         <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
//                             <span class="sr-only">Buka menu Utama</span>
//                             <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
//                         </button>
//                     </div>
//                     <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
//                         <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                             <li>
//                                 <Link to='/admin/user' class="block focus:text-white py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Petugas</Link>
//                             </li>
//                             <li>
//                                 <Link to='/admin/menu' class="block focus:text-white py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Menu</Link>
//                             </li>
//                             <li>
//                                 <Link to='/admin/meja' class="block focus:text-white py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Meja</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }