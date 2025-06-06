import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Employee, columns } from "./columns";
import { Client, columns as ColumnsClient } from "./columnsClient";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

const User = async (props: Props) => {
  const supabase = await createClient();
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

  const data = await fetch(`${process.env.API_URL}/client`);
  const clients = await data.json();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-medium">Users</h1>
      </div>
      <Tabs defaultValue="employee" className="w-full">
        <TabsList>
          <TabsTrigger value="employee">Employee</TabsTrigger>
          <TabsTrigger value="client">Client</TabsTrigger>
        </TabsList>
        <TabsContent value="employee" className="w-full">
          <div className="flex justify-end">
            <Link href="/admin/create-user">
              <Button variant="outline">Create User</Button>
            </Link>
          </div>

          <DataTable
            columns={columns}
            data={formattedEmployees as Employee[]}
          />
        </TabsContent>
        <TabsContent value="client">
          <div className="flex justify-end">
            <Link href="/admin/create-client">
              <Button variant="outline">Create Client</Button>
            </Link>
          </div>
          <DataTable columns={ColumnsClient} data={clients as Client[]} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default User;
