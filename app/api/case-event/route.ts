import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Secret server-side key
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { caseId, event_date, description, title, notes, event_type } = body;

  const { data, error } = await supabase.from("case_events").insert({
    case_id: caseId,
    event_date,
    description,
    title,
    notes,
    event_type,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to create case event" },
      { status: 500 }
    );
  }

  // Here you would typically insert the event into your database
  // For demonstration, we will just return a success response
  return NextResponse.json(
    {
      message: "Case event created successfully",
    },
    { status: 200 }
  );
}
