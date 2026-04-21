"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, PersonStanding } from "lucide-react";

export default function SidePanel() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Products", href: "/admin/Products" },
    { name: "Orders", href: "/admin/Order"},
  ];

  return (
    <>
      {/* Mobile Toggle Button - Floating Style to match Premium Aesthetic */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-6 left-6 z-[60] bg-[#1C1C19] text-[#D4AF77] p-4 rounded-none shadow-2xl border border-[#D4AF77]/20 flex items-center justify-center group"
          aria-label="Open Menu"
        >
          <Menu size={20} className="group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-[#000]/40 backdrop-blur-md z-[55] lg:hidden transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed left-0 top-0 h-full w-50 bg-[#F6F3EE] dark:bg-[#121210] border-r border-[#D4AF77]/10 flex flex-col z-[58] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-6 right-6 text-[#1C1C19]/40 hover:text-[#D4AF77] transition-colors"
        >
          <X size={20} />
        </button>
      {/* Branding Area */}
      <div className="p-8 mb-6">
        <h1 className="font-['Newsreader'] italic text-[#D4AF77] text-3xl tracking-tighter leading-none">
          ESTURRO
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="h-[1px] w-4 bg-[#D4AF77]/40"></span>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#1C1C19]/50 dark:text-[#FCF9F4]/40 font-semibold">
            Atelier Admin
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`group flex items-center gap-4 px-4 py-3 rounded transition-all duration-300 ${
                    isActive
                      ? "bg-[#D4AF77] text-white shadow-lg shadow-[#D4AF77]/20"
                      : "text-[#1C1C19]/60 dark:text-[#FCF9F4]/50 hover:bg-[#D4AF77]/5 hover:text-[#D4AF77]"
                  }`}
                >
              
                  <span className="text-[11px] font-['Manrope'] font-bold uppercase tracking-widest">
                    {link.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Profile */}
      <div className="p-6 bg-gradient-to-t from-[#D4AF77]/5 to-transparent border-t border-[#D4AF77]/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full border border-[#D4AF77]/30 flex items-center justify-center bg-white dark:bg-[#1C1C19]">
              <span className="material-symbols-outlined text-base text-[#D4AF77]">person</span>
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#F6F3EE] dark:border-[#121210] rounded-full"></div>
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-[10px] font-bold text-[#1C1C19] dark:text-[#FCF9F4] uppercase tracking-wider">
              Admin User
            </p>
            <p className="truncate text-[9px] text-[#D4AF77] italic opacity-80">
              saadmirzapak@gmail.com
            </p>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}

