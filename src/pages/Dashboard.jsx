import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeProvider";
import React, { useState, useEffect, useContext } from "react";
import apiClient from "@/api/axiosInterceptors";
import AuthContext from "@/context/AuthProvider";
const Dashboard = () => {
  
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Hero />
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
