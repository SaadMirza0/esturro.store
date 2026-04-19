
import SidePanel from "@/app/(admin)/admin/components/sidepanel";
import "./globals.css";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen bg-[#FCF9F4]"> {/* Cream/Off-white background */}
          
          {/* 1. Fixed Side Panel - Higher Z-index and performance optimization */}
          <aside 
            className="w-64 fixed inset-y-0 left-0 bg-[#1C1C19] border-r border-[#D4AF77]/10 z-[60] hidden lg:block"
          >
            {/* Replace this with your SidePanel component */}
            <div className="p-6 text-[#D4AF77]">
              <SidePanel/>

            </div>
          </aside>

          {/* 2. Main Content Area - Corrected padding-left instead of ml-64 for better stability */}
          <main className="flex-1 lg:pl-64 min-h-screen">
            <div className="p-6 md:p-10 max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          
        </div>
      </body>
    </html>
  );
}
