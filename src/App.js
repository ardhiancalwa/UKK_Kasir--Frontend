import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Meja from "./pages/admin/meja";
import Menu from "./pages/admin/menu";
import User from "./pages/admin/user";
import Chart from "./pages/manajer/chart";
import HomeAdmin from "./pages/admin/home";
import NavbarKasir from "./pages/kasir/navbar";
import Pemesanan from "./pages/kasir/pemesanan";
import RiwayatPemesanan from "./pages/kasir/riwayatPemesanan";
import NavbarManajer from "./pages/manajer/navbar";
import HomeManajer from "./pages/manajer/home";
import NavbarAdmin from "./pages/admin/navbar";
import HomeKasir from "./pages/kasir/home";
import Manajer from "./pages/manajer/chart";

function App() {
  //   const myStyle={
  //     backgroundImage: "url('https://img.freepik.com/free-vector/retro-rays-vintage-sunburst-background_1017-33768.jpg?w=2000')",
  //     height:'100vh',
  //     backgroundSize: 'cover',
  //     backgroundRepeat: 'no-repeat',
  // };
  return (
    // <div style={myStyle}>
    <Routes>
      <Route exact path="/admin/menu" element={<Menu />} />
      <Route exact path="/" element={<Login />} />
      <Route exact path="/admin/meja" element={<Meja />} />
      <Route exact path="/admin/user" element={<User />} />
      <Route exact path="/admin/navbar" element={<NavbarAdmin />} />
      <Route exact path="/admin/home" element={<HomeAdmin />} />
      <Route exact path="/kasir/home" element={<HomeKasir />} />
      <Route exact path="/kasir/navbar" element={<NavbarKasir />} />
      <Route exact path="/kasir/pemesanan" element={<Pemesanan />} />
      <Route exact path="/kasir/riwayat" element={<RiwayatPemesanan />} />
      <Route exact path="/manajer/navbar" element={<NavbarManajer />} />
      <Route exact path="/manajer/home" element={<HomeManajer />} />
      <Route exact path="/manajer/chart" element={<Manajer />} />
    </Routes>
    // </div>

  );
}


export default App