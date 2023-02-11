import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Meja from "./pages/admin/meja";
import Menu from "./pages/admin/menu";
import User from "./pages/admin/user";

function App() {
  return (
    <Routes>
      <Route exact path="/admin/menu" element={<Menu />} />
      <Route exact path="/navbar" element={<Navbar />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/admin/meja" element={<Meja />} />
      <Route exact path="/admin/user" element={<User />} />
    </Routes>
  );
}

export default App