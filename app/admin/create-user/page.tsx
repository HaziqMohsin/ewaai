import React from "react";
import CreateUserForm from "./form";

type Props = {};

const CreateUser = async (props: Props) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Create a new user by filling out the form below. Ensure all fields are
        completed accurately.
      </p>
      <CreateUserForm />
    </div>
  );
};

export default CreateUser;
