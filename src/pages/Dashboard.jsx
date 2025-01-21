import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeProvider";
import PostList from "@/components/PostList";
import Footer from "@/components/Footer";
import { useOutlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "@/api/axiosInterceptors";
const Dashboard = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const URL = "/posts";
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get(URL);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <ThemeProvider>
        <Navbar />
        {location.pathname === "/" ? <Hero /> : ""}

        {outlet ? outlet : <PostList post={data} />}

        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
