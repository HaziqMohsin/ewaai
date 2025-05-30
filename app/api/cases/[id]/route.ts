import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data: caseData, error } = await supabase
    .from("cases")
    .select(
      `
      *,
      client:profiles!cases_client_id_fkey (
        full_name
      ),
      creator:profiles!cases_created_by_fkey (
        full_name
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase error:", error);

    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to fetch case data" },
      { status: 500 }
    );
  }

  if (!caseData) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }

  const { data: participantsData, error: participantsError } = await supabase
    .from("case_participants")
    .select(
      `
        *,
        profile:profiles!case_participants_profile_id_fkey (
          full_name)
          `
    )
    .eq("case_id", id);

  if (participantsError) {
    return NextResponse.json(
      { error: "Failed to fetch case participants" },
      { status: 500 }
    );
  }

  const formattedParticipants = participantsData?.map((participant: any) => ({
    role: participant.role,
    full_name: participant.profile?.full_name,
  }));

  const formattedCaseData = {
    id: caseData.id,
    title: caseData.title,
    description: caseData.description,
    case_type: caseData.case_type,
    court_level: caseData.court_level,
    client_name: caseData.client?.full_name,
    created_by: caseData.creator?.full_name,
    created_at: caseData.created_at,
    status: caseData.status,
    participant: formattedParticipants || [],
  };

  return NextResponse.json(
    {
      data: formattedCaseData,
    },
    { status: 200 }
  );
}
