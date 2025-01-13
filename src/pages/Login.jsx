import React from "react";
import useLoginForm from "../components/hooks/useLoginForm";
import character from "@/assets/images/logo/character.png";
import cactus from "@/assets/images/logo/cactus.png";
import "@/assets/styles/login.css";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const { formik, loading } = useLoginForm();
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-custom-gradient dark:bg-custom-gradient">
      <div className="form-container">
        <div className="form-details">
          <div className="form-header">
            <h1>Logo Here</h1>
            <p className="dark:text-black">Blogging site developed during intern!!!!</p>
            <h3>Log In</h3>
          </div>
          <div className="form-content">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-component">
                <label htmlFor="email" className="dark:text-black">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="form-component">
                <label htmlFor="password" className="dark:text-black">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>

              <Button className="btn-submit" type="submit">
                login{" "}
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <FaAngleRight />
                )}
              </Button>
            </form>
          </div>
          <div className="form-footer">
            <p className="dark:text-black">
              Need an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
        {/* <div>
          <img src={cactus} alt="cactus" />
        </div> */}
        <div className="side-container">
          <img src={character} alt="" className="character-img" />
          <img src={cactus} alt="" className="cactus-img" />
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
