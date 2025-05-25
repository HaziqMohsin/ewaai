import React from "react";
import AddUser from "../addUser-form";

type Props = {};

const Create = async (props: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-medium">Create User</h1>
      <p className="text-sm text-muted-foreground">
        This page is under construction. Please check back later.
      </p>
      <AddUser />
      {/* Add your form or other components here */}
    </div>
  );
};

export default Create;
