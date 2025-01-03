import React from "react";
import useLoginForm from "./hooks/useLoginForm";
import character from "@/assets/logo/character.png";
import cactus from "@/assets/logo/cactus.png";
import "./styles/login.css";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const { formik } = useLoginForm();
  //   console.log(formik.values);
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-custom-gradient">
      <div className="form-container">
        <div className="form-details">
          <div className="form-header">
            <h1>Logo Here</h1>
            <p>Blogging site developed during intern!!!!</p>
            <h3>Log In</h3>
          </div>
          <div className="form-content">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-component">
                <label htmlFor="email">Email</label>
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
                <label htmlFor="password">Password</label>
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

              <button className="btn-submit" type="submit">login <FaAngleRight /></button>
            </form>
          </div>
          <div className="form-footer">
            <p>
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
    </div>
  );
};

export default Login;
