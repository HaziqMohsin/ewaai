import { createClient } from "@/utils/supabase/server";
import EditUserForm from "./form";
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

  return (
    <div>
      <EditUserForm
        id={employees.id}
        employee_number={employees.employee_number}
        job_title={employees.job_title}
        department={employees.department}
        status={employees.status}
        full_name={employees.profiles?.full_name}
        username={employees.profiles?.username}
        role={employees.profiles?.role}
        joined_at={employees.joined_at}
        medical_leave={employees.medical_leave}
        annual_leave={employees.annual_leave}
        salary={employees.salary}
      />
    </div>
  );
}
