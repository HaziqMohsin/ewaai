import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Secret server-side key
);

export async function GET() {
  const { data: employees, error: errEmp } = await supabase.from("employees")
    .select(`
    *,
    profiles (
      full_name,
      username,
      role
    )
  `);

  if (errEmp) {
    return NextResponse.json({ error: errEmp.message }, { status: 500 });
  }

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

  return NextResponse.json({ data: formattedEmployees }, { status: 200 });
}
