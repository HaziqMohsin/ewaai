import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Employee, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import AddUser from "./addUser-form";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

const User = async (props: Props) => {
  const supabase = await createClient();
  const { data: profile, error } = await supabase.from("profiles").select("*");
  const { data: employees, error: errEmp } = await supabase.from("employees")
    .select(`
    *,
    profiles (
      full_name,
      username,
      role
    )
  `);

  const formattedEmployees = employees?.map((emp) => ({
    id: emp.id,
    employee_number: emp.employee_number,
    job_title: emp.job_title,
    department: emp.department,
    status: emp.status,
    full_name: emp.profiles?.full_name,
    username: emp.profiles?.username,
    role: emp.profiles?.role,
  }));

  console.log(formattedEmployees);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-medium">Users</h1>
        <Link href="/admin/create-user">
          <Button variant="outline">Create User</Button>
        </Link>
      </div>
      <Tabs defaultValue="employee" className="w-full">
        <TabsList>
          <TabsTrigger value="employee">Employee</TabsTrigger>
          <TabsTrigger value="client">Client</TabsTrigger>
        </TabsList>
        <TabsContent value="employee" className="w-full">
          <DataTable
            columns={columns}
            data={formattedEmployees as Employee[]}
          />
        </TabsContent>
        <TabsContent value="client">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default User;
