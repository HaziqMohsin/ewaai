import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Secret server-side key
);

export async function GET() {
  const { data: clients, error } = await supabase.from("clients").select(`
      *,
      profiles (
        full_name
      )
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const formattedClients = clients?.map((client) => ({
    id: client.id,
    full_name: client.profiles?.full_name,
    phone: client.phone,
    address: client.address,
    ic_number: client.ic_number,
  }));

  return NextResponse.json(formattedClients, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { full_name, phone, email } = body;

  const { data: userData, error: inviteError } =
    await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/client`,
    });

  if (inviteError) {
    return NextResponse.json({ error: inviteError.message }, { status: 400 });
  }

  const userId = userData.user?.id;

  // Step 2: update into profiles
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name,
      role: "client",
    })
    .eq("id", userId);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }

  // Step 3: Insert into clients table
  const { error: clientError } = await supabase.from("clients").insert({
    id: userId,
    phone,
  });

  if (clientError) {
    return NextResponse.json({ error: clientError.message }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Client invited successfully" },
    { status: 200 }
  );
}
