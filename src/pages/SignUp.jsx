import React from "react";
import { Link } from "react-router-dom";
import useSignUp from "../components/hooks/useSignUp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import character from "@/assets/images/logo/character.png";
import { ToastContainer } from "react-toastify";
import { Loader2 } from "lucide-react";
const SignUp = () => {
  const { formik, loading } = useSignUp();
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-custom-gradient">
      <div className="w-[75vw] relative bg-white h-[95vh] rounded-3xl overflow-hidden ">
        <div className="absolute left-0 lg:w-1/3 sm:w-0 md:w-0 lg:h-full bg-customPink signup-side-container">
          <img
            src={character}
            alt=""
            className="absolute right-[-100px] z-10 top-80"
          />
        </div>

        <Card className="absolute right-0 items-center border-none shadow-none p-7 lg:w-2/3 sm:w-full">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <Form>
              <form
                onSubmit={formik.handleSubmit}
                className="grid items-center w-full gap-4"
              >
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.firstName}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.lastName}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="number"
                    id="phone"
                    name="phone"
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.phone}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  ) : null}
                </div>
                <Button type="submit">
                  Sign Up
                  {loading ? <Loader2 className="animate-spin" /> : ""}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p>
              Already have an account? <Link to="/">Sign In</Link>
            </p>
          </CardFooter>
        </Card>
        <ToastContainer
          position="top-center"
          // autoClose={5000}
          // hideProgressBar={false}
          // newestOnTop={false}
          // closeOnClick={false}
          // rtl={false}
          // pauseOnFocusLoss
          // draggable
          // pauseOnHover
          // theme="light"
          // transition={Bounce}
        />
      </div>
    </div>
  );
};

export default SignUp;
