import { createClient } from "@supabase/supabase-js";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Secret server-side key
  );

  // Step 1: Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log(user);

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Step 2: Join with profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  // Step 3: Combine user + profile
  const userInfo = {
    id: user.id,
    email: user.email,
    full_name: profile.full_name,
    username: profile.username,
    role: profile.role,
    avatar_url: profile.avatar_url,
    created_at: user.created_at,
  };

  return NextResponse.json({ user: userInfo }, { status: 200 });
}
