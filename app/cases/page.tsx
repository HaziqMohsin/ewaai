import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns, Case } from "./columns";

export default async function Page() {
  const data = await fetch(`${process.env.API_URL}/cases`);
  const cases = await data.json();

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="flex justify-between gap-4">
        <h1 className="text-2xl font-bold mb-4">Case Management</h1>
        <div className="flex gap-4 items-center">
          <Link href="/admin/create-client">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Register client
            </Button>
          </Link>
          <Link href="/cases/create">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Create New Case
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={cases as Case[]} />
    </div>
  );
}
