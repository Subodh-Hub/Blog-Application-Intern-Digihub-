import apiClient from "@/api/axiosInterceptors";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userInf, setUserInf] = useState({});
  const URL = "/getUser-auth";

  const fetchData = async () => {
    try {
      const response = await apiClient.get(URL);
      setUserInf(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in.");
        localStorage.removeItem("accessToken");
      } else {
        toast.error("Failed to fetch user data.");
      }
    }
  };

  const token = localStorage.getItem("accessToken");
 
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ userInf, setUserInf,fetchData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
