import React from "react";
import useSignUp from "./hooks/useSignUp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle,CardFooter } from "./ui/card";
const SignUp = () => {
  const { formik } = useSignUp();
  console.log(formik.values);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-5 m-auto sm:w-[95vw] md:w-[500px] lg:w-[600px]">
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
                  <p className="text-sm text-red-500">{formik.errors.firstName}</p>
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
                  <p className="text-sm text-red-500">{formik.errors.lastName}</p>
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
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
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
                  <p className="text-sm text-red-500">{formik.errors.password}</p>
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
                  <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
                ) : null}
              </div>
              <Button type="submit">Sign Up</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>
            Already have an account? <Button variant="link">Sign In</Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
