import CreateClientForm from "./form";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh">
      <h1 className="text-2xl font-medium mb-4">Create Client</h1>
      <CreateClientForm />
    </div>
  );
}
