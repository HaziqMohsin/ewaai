import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Secret server-side key
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password, role, full_name, email, job_title, department } =
    body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  const { data: resProfile, error: errProfile } = await supabase
    .from("profiles")
    .update([{ username, full_name, role }])
    .eq("id", data.user?.id)
    .select();

  if (role !== "client") {
    const { data: resEmp, error: errEmp } = await supabase
      .from("employees")
      .insert([
        {
          id: data.user?.id,
          job_title,
          department, // You can change this to a specific department if needed
        },
      ]);

    if (errEmp) {
      return NextResponse.json(
        { error: errEmp.message, msg: "create employee error" },
        { status: 400 }
      );
    }
  }

  if (error) {
    return NextResponse.json(
      { error: error.message, msg: "create user error" },
      { status: 400 }
    );
  }

  if (errProfile) {
    return NextResponse.json(
      { error: errProfile.message, msg: "create profile error" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 200 }
  );
}
