import React from "react";
import useAuth from "@/components/hooks/useAuth";
const Overview = () => {
  const { userInf } = useAuth();
  return (
    <div className="flex flex-col gap-3 text-base font-poppins">
      <p>
        First Name:{" "}
        <strong className="capitalize">
          {userInf.firstName}
        </strong>
      </p>
      <p>
        Middle Name:
        <strong>{userInf.middleName}</strong>
      </p>

      <p className="capitalize">
        Last Name: <strong>{userInf.lastName}</strong>
      </p>
      <p>
        Email: <strong>{userInf.email}</strong>
      </p>

      <p>
        Phone: <strong>{userInf.phone}</strong>
      </p>
      <p>
        Role: <strong>{userInf.role}</strong>
      </p>
    </div>
  );
};

export default Overview;
