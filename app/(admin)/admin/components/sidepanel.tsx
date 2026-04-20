"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidePanel() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Products", href: "/admin/Products", icon: "inventory_2" },
    { name: "Orders", href: "/admin/Order", icon: "shopping_cart" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#F6F3EE] dark:bg-[#121210] border-r border-[#D4AF77]/10 flex flex-col z-50">
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
                  <span className={`material-symbols-outlined text-[20px] transition-colors ${
                    isActive ? "text-white" : "text-[#D4AF77]/60 group-hover:text-[#D4AF77]"
                  }`}>
                    {link.icon}
                  </span>
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
  );
}

