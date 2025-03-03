import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../hooks/useAuth";


const ProtectedRoutes = () => {
    const token = localStorage.getItem("accessToken");

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;