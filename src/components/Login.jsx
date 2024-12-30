import React from "react";
import useLoginForm from "./hooks/useLoginForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
const Login = () => {
  const { formik } = useLoginForm();
  //   console.log(formik.values);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-5 m-auto sm:w-[95vw] md:w-[500px] lg:w-[600px]">
        <CardHeader className="mb-5">
          <CardTitle>Sign-In</CardTitle>
          <CardDescription>
            Blogging site developed during intern
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form>
            <form
              onSubmit={formik.handleSubmit}
              className="grid items-center w-full gap-4"
            >
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userName">User Name</Label>
                <Input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <p className="text-sm text-red-500">
                    {formik.errors.userName}
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

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col justify-between gap-2 ">
          <Button variant="link">Forgot Password</Button>
          <p>
            Need an account? <Button variant="link">Sign Up</Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
