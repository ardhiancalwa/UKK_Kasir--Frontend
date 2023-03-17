import React from "react";
import NavbarAdmin from "./navbar";

export default class HomeAdmin extends React.Component {
  render() {
    return (
      <div className="w-full">
        <NavbarAdmin />
        <div class="overflow-hidden bg-gray-900 py-24 sm:py-5">
          <div class=" isolate px-6 pt-24 lg:px-8 object-contain">
          <img src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-5" />
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-80">
              <svg class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678">
                <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
                <defs>
                  <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2563eb" />
                    <stop offset="1" stop-color="#7dd3fc" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div class="hidden sm:mb-8 sm:flex sm:justify-center">
              </div>
              <div class="text-center">
                <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Selamat Datang di Wikusama Cafe</h1>
                <p class="mt-6 text-4xl leading-8 text-white "></p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                  <a href="http://localhost:3000/admin/menu" class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lihat</a>
                </div>
              </div>
            </div>
            <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              <svg class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678">
                <path fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
                <defs>
                  <linearGradient id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2563eb" />
                    <stop offset="1" stop-color="#7dd3fc" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </div>
      </div>
    )
  }
}