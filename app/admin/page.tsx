import React from "react";
import AuthButton from "@/components/header-auth";

type Props = {};

const Admin = async (props: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-medium">Admin</h1>
      <p className="text-sm text-foreground">
        This is the admin page. Only accessible to users with admin role.
      </p>
      <div className="flex flex-col gap-2 mt-8">
        <p className="text-sm text-foreground">
          You can manage your application here.
        </p>
        <AuthButton />
      </div>
    </div>
  );
};

export default Admin;
