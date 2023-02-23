import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Sidebar from "./pages/admin/sidebar";
import Meja from "./pages/admin/meja";
import Menu from "./pages/admin/menu";
import User from "./pages/admin/user";
import Navbar from "./pages/admin/navbar";
import Chart from "./pages/manajer/chart";

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
      <Route exact path="/admin/sidebar" element={<Sidebar />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/admin/meja" element={<Meja />} />
      <Route exact path="/admin/user" element={<User />} />
      <Route exact path="/admin/navbar" element={<Navbar />} />
      <Route exact path="/" element={<Chart />} />
    </Routes>
    // </div>

  );
}


export default App