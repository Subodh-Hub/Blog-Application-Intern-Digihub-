import React, { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
