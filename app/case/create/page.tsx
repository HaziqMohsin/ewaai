import CreateCaseForm from "../createCaseForm";
import { createClient } from "@/utils/supabase/server";

export default async function CreateCasePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const data = await fetch(`${process.env.API_URL}/employee`);
  const emp = await data.json();

  return (
    <div className="max-w-lg mx-auto h-full flex flex-col gap-4 p-4 my-10">
      <h1 className="text-2xl font-bold">Create New Case</h1>
      <p className="text-gray-600 mb-4">
        Use the form below to create a new case. Fill in all required fields and
        assign lawyers and clerks as needed.
      </p>
      <CreateCaseForm profiles={emp?.data} currentUserId={user?.id as string} />
    </div>
  );
}
