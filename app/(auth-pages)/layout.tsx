export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center flex-1 items-center max-w-md w-full mx-auto">
      {children}
    </div>
  );
}
