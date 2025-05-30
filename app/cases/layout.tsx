import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="p-4">
        <SidebarTrigger />
      </div>

      <main className="w-full min-h-dvh flex flex-col gap-4 p-4 relative">
        {children}
      </main>
    </SidebarProvider>
  );
}
