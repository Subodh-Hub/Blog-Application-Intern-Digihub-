import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeProvider";
import React, { useState, useEffect, useContext } from "react";
import apiClient from "@/api/axiosInterceptors";
import AuthContext from "@/context/AuthProvider";
import PostList from "@/components/PostList";
import Footer from "@/components/Footer";
const Dashboard = () => {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Hero />
        <PostList />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
