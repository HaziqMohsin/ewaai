import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Profiles, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import AddUser from "./addUser-form";

type Props = {};

const User = async (props: Props) => {
  const supabase = await createClient();

  const { data: profile, error } = await supabase.from("profiles").select("*");

  console.log(profile);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-medium">Users</h1>
        <AddUser />
      </div>
      <DataTable columns={columns} data={profile as Profiles[]} />
    </div>
  );
};

export default User;
