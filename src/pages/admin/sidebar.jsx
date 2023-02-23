import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineFastfood } from "react-icons/md";
import { HiOutlineTableCells } from "react-icons/hi2";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import {MdFastfood} from "react-icons/md"

 
export default class Sidebar extends React.Component {
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/"
    }
    render() {
        return (
            // <div>
            //           <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            //         <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            //             <a href="https://flowbite.com/" class="flex items-center pl-2.5 mb-5">
            //                 <img src="/logo.png" class="h-6 mr-3 sm:h-7" alt="Wikusama Logo" />
            //                 <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Wikusama</span>
            //             </a>
            //             <ul class="space-y-2">
            //                 <li>
            //                     <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            //                         <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
            //                         <span class="ml-3">Dashboard</span>
            //                     </a>
            //                 </li>
            //                 <li>
            //                     <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    
            //                         <span class="flex ml-3 whitespace-nowrap"><MdFastfood/>Menu Kafe</span>
            //                     </a>
            //                 </li>
            //                 <li>
            //                     <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            //                         <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
            //                         <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
            //                     </a>
            //                 </li>
            //                 <li>
            //                     <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            //                         <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            //                         <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
            //                     </a>
            //                 </li>
            //                 <li>
            //                     <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            //                         <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
            //                         <span class="flex-1 ml-3 whitespace-nowrap">Products</span>
            //                     </a>
            //                 </li>
            //                 <li>
            //                     <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            //                         <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
            //                         <span class="flex-1 ml-3 whitespace-nowrap">Sign In</span>
            //                     </a>
            //                 </li>
            //                 <li>
            //                     <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            //                         <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
            //                         <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
            //                     </a>
            //                 </li>
            //             </ul>
            //         </div>
            //     </aside>
            // </div>
            // <div className="relative bg-gray-50 dark:bg-slate-900 w-screen h-screen pattern">
            //     <nav className="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border">
            //         <a href="#profile" className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 bg-indigo-50 text-indigo-600 dark:bg-sky-900 dark:text-sky-50">
            //             <svg xmlns="http://www.w3.org/2000/svg"
            //                 fill="none"
            //                 viewBox="0 0 24 24"
            //                 stroke-width="1.5"
            //                 stroke="currentColor"
            //                 class="w-6 h-6 shrink-0">
            //                 <path stroke-linecap="round"
            //                     stroke-linejoin="round"
            //                     d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            //             </svg>
            //             <small className="text-center text-xs font-medium">
            //                 Profile
            //             </small>
            //         </a>
            //         <a href="#analytics" className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800">
            //             <svg xmlns="http://www.w3.org/2000/svg"
            //                 fill="none"
            //                 viewBox="0 0 24 24"
            //                 stroke-width="1.5"
            //                 stroke="currentColor"
            //                 class="w-6 h-6 shrink-0">
            //                 <path stroke-linecap="round"
            //                     stroke-linejoin="round"
            //                     d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            //             </svg>
            //             <small className="text-center text-xs font-medium">
            //                 Analystics
            //             </small>
            //         </a>
            //         <a href="#settings" className="lex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800">
            //             <svg xmlns="http://www.w3.org/2000/svg"
            //                 fill="none"
            //                 viewBox="0 0 24 24"
            //                 stroke-width="1.5"
            //                 stroke="currentColor"
            //                 class="w-6 h-6 shrink-0">
            //                 <path stroke-linecap="round"
            //                     stroke-linejoin="round"
            //                     d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            //                 <path stroke-linecap="round"
            //                     stroke-linejoin="round"
            //                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            //             </svg>
            //             <small className="text-center text-xs font-medium">
            //                 Setting
            //             </small>
            //         </a>
            //         <hr className="dark:border-gray-700/60" class="flex h-16 w-16 flex-col items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400" />
            //         <a href="/">
            //             <svg xmlns="http://www.w3.org/2000/svg"
            //                 fill="none"
            //                 viewBox="0 0 24 24"
            //                 stroke-width="1.5"
            //                 stroke="currentColor"
            //                 class="w-6 h-6">
            //                 <path stroke-linecap="round"
            //                     stroke-linejoin="round"
            //                     d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            //             </svg>
            //             <small className="text-xs font-medium">Home</small>
            //         </a>
            //     </nav>
            // </div>

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
                            <img src="/logo.png" class="h-6 mr-6 sm:h-7" alt="Logo Kasir Kafe" />
                        </a>
                        <ul class="space-y-2">
                            <li>    
                                <Link to="/admin/menu" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-lime-800">
                                    <MdOutlineFastfood className="ml-0.5" size={20} />
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/meja" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-lime-800">
                                    <HiOutlineTableCells className="ml-0.5" size={20} />
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/user" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-lime-800">
                                    <AiOutlineUser className="ml-0.5" size={20}/>
                                </Link>
                            </li>
                        </ul>
                        <ul class="pt-2 space-y-2 content-end border-t border-white dark:border-white">
                            <li>
                                <Link to="" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-lime-800" onClick={() => this.Logout()}>
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