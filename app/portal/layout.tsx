import Sidebar from "@/components/portal/layouts/Sidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/*  sidebar*/}
      <Sidebar/>
      <main className="p-6">{children}</main>
    </div>
  );
}