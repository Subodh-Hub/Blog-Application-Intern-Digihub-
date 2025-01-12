import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import React from "react";

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
