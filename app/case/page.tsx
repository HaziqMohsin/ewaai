import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh">
      <h1 className="text-2xl font-bold mb-4">Case Management</h1>
      <p className="mb-6">Manage your cases efficiently and effectively.</p>
      <div className="flex gap-4 items-center">
        <Link href="/admin/create-client">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Register client
          </Button>
        </Link>
        <Link href="/case/create">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Create New Case
          </Button>
        </Link>
      </div>
    </div>
  );
}
