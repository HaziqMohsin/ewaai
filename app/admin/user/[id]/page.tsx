import { createClient } from "@/utils/supabase/server";
import View from "./view";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;
  const { data: employees, error: errEmp } = await supabase
    .from("employees")
    .select(
      `
    *,
    profiles (
      full_name,
      username,
      role
    )
  `
    )
    .eq("id", id)
    .single();

  const formattedEmployees = {
    id: employees.id,
    employee_number: employees.employee_number,
    job_title: employees.job_title,
    department: employees.department,
    status: employees.status,
    full_name: employees.profiles?.full_name,
    username: employees.profiles?.username,
    role: employees.profiles?.role,
    joined_at: employees.joined_at,
    medical_leave: employees.medical_leave,
    annual_leave: employees.annual_leave,
    salary: employees.salary,
  };

  return (
    <div>
      <View
        id={formattedEmployees.id}
        employee_number={formattedEmployees.employee_number}
        job_title={formattedEmployees.job_title}
        department={formattedEmployees.department}
        status={formattedEmployees.status}
        full_name={formattedEmployees.full_name}
        username={formattedEmployees.username}
        role={formattedEmployees.role}
        joined_at={formattedEmployees.joined_at}
        medical_leave={formattedEmployees.medical_leave}
        annual_leave={formattedEmployees.annual_leave}
        salary={formattedEmployees.salary}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-end">
          <Link href="/admin/user">
            <Button variant="outline" className="mt-4 ">
              <ArrowLeft className="mr-2" />
              Back to Users
            </Button>
          </Link>
        </div>
        <div className="">
          <Link href={`/admin/edit-user/${id}`}>
            <Button variant="default" className="mt-4">
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
