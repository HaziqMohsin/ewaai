import CreateCaseEventForm from "./createEventForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return (
    <div className="max-w-lg mx-auto h-full flex flex-col gap-4 p-4 my-10">
      <h1 className="text-2xl font-bold">Create New Case Event</h1>
      <p className="text-gray-600 mb-4">
        Use the form below to create a new case event. Fill in all required
        fields and assign participants as needed.
      </p>
      <div>
        <CreateCaseEventForm caseId={id} />
      </div>
    </div>
  );
}
