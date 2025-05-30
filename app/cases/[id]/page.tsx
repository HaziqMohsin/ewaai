export default async function CasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetch(`${process.env.API_URL}/cases/${id}`);
  const caseData = await data.json();
  console.log(caseData);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Case Details</h1>
      <p className="text-gray-600 mb-4">
        This page displays the details of a specific case. You can view and
        manage the case information, including assigned lawyers, clerks, and
        case status.
      </p>
    </div>
  );
}
