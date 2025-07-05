import React from "react";

// import './App.css'
import { Route, Routes } from "react-router-dom";
import Tenants from "./Components/Pages/Tenants";
import Navbar1 from "./Components/Navbar/Navbar1";
import Assets from "./Components/Pages/Assets";
import Home from "./Components/Pages/Home";
import Background from "./Components/Pages/Background";
import Users from "./Components/Pages/Users";

function App() {
  return (
    <>
      <Navbar1 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tenant" element={<Tenants />} />
        <Route path="/Assets" element={<Assets />} />
        <Route path="/Users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
