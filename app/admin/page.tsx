import React from "react";
import AuthButton from "@/components/header-auth";
import Dashboard from "./dashboard";

type Props = {};

const Admin = async (props: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-medium">Admin</h1>
      <AuthButton />
      <Dashboard />
    </div>
  );
};

export default Admin;
