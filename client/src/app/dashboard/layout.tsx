import Sidebar from "@/modules/users/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {children}
      </main>
    </div>
  );
}
