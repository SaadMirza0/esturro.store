// app/admin/layout.tsx
import SidePanel from "@/app/(admin)/admin/components/sidepanel";
import "./globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased ">
        <div className="flex min-h-screen">
    
          <SidePanel />


    
          <main className="flex-1 lg:ml-72 w-full min-h-screen">
            <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

