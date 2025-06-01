import { Label } from "@/components/ui/label";
import { DataTable } from "./data-table";
import { columnsEvent, CaseEvent } from "./columnsEvent";
import { format } from "date-fns";

export default async function CasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetch(`${process.env.API_URL}/cases/${id}`);
  const caseData = await data.json();
  const {
    data: {
      title,
      description,
      case_type,
      court_level,
      client_name,
      created_at,
      participant,
      case_status,
      case_event,
    },
  } = caseData;

  return (
    <div className="flex flex-col gap-4 my-10">
      <div className="grid grid-cols-1">
        <h3 className="text-lg font-semibold mb-4">Case Details</h3>
        <div className="grid grid-cols-6 gap-4 items-center">
          <Label className="text-right">Client Name:</Label>
          <span className="col-span-4">{client_name}</span>
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <Label className="text-right">Title:</Label>
          <span className="col-span-4">{title}</span>
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <Label className="text-right">Description:</Label>
          <span className="col-span-4">{description || "-"}</span>
        </div>

        <div className="grid grid-cols-6 gap-4 items-center">
          <Label className="text-right">Case type:</Label>
          <span className="col-span-4">{case_type}</span>
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <Label className="text-right">Court Level:</Label>
          <span className="col-span-4">{court_level || "-"}</span>
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <Label className="text-right">Created at:</Label>
          <span className="col-span-4">
            {format(new Date(created_at), "dd/MM/yyyy") || "-"}
          </span>
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <Label className="text-right">Status:</Label>
          <span className="col-span-4">{case_status || "-"}</span>
        </div>
        <hr className="my-4" />
        <h3 className="text-lg font-semibold mb-4">Participants</h3>
        <div className="grid grid-cols-6 gap-4 items-center">
          <Label className="text-right">Lawyer:</Label>
          <span className="col-span-4">
            {participant.find((v: any) => v.role === "lawyer").full_name}
          </span>
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <Label className="text-right">Clerk:</Label>
          <span className="col-span-4">
            {participant.find((v: any) => v.role === "clerk").full_name}
          </span>
        </div>
        <hr className="my-4" />
        <h3 className="text-lg font-semibold">Events</h3>
        <DataTable columns={columnsEvent} data={case_event as CaseEvent[]} />
        <hr className="my-4" />
        <h3 className="text-lg font-semibold mb-4">Documents</h3>
      </div>
    </div>
  );
}
