import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Secret server-side key
);

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, role, full_name, email } = body;

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
