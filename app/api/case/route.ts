import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Secret server-side key
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    title,
    description,
    case_type,
    court_level,
    client_id,
    created_by,
    participants,
  } = body;

  const { data: dataCases, error: errCases } = await supabase
    .from("cases")
    .insert({
      title,
      description,
      case_type,
      court_level,
      client_id,
      created_by,
    })
    .select("id")
    .single();

  if (errCases) {
    return NextResponse.json({ error: errCases.message }, { status: 400 });
  }

  const caseId = dataCases.id;

  const participantRows = participants.map(
    (p: { profile_id: string; role: string }) => ({
      case_id: caseId,
      profile_id: p.profile_id,
      role: p.role,
    })
  );

  const { error: participantError } = await supabase
    .from("case_participants")
    .insert(participantRows);

  if (participantError) {
    return NextResponse.json(
      { error: participantError.message },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Case created successfully" },
    { status: 200 }
  );
}
