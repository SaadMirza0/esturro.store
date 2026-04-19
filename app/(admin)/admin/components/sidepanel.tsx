import Link from "next/link";
export default function SidePanel() {

return(
<aside className="bg-[#F6F3EE] dark:bg-[#1C1C19] text-[#D4AF77] font-['Manrope'] uppercase tracking-widest text-xs docked fixed left-0 top-0 h-full w-64 shadow-[20px_0_40px_rgba(28,28,25,0.04)] flex flex-col h-full py-8 z-50">
<div className="px-8 mb-12">
<h1 className="font-['Newsreader'] italic text-[#D4AF77] text-2xl tracking-tighter">ESTURRO</h1>
<p className="text-[10px] mt-1 opacity-60">Luxury Atelier Admin</p>
</div>
<nav className="flex-1">
<ul className="space-y-1">
<li>
<Link href="/admin/Products" className="flex items-center gap-4 px-8 py-4 text-[#1C1C19] dark:text-[#FCF9F4] font-bold border-r-4 border-[#D4AF77] bg-[#FFFFFF]/50 dark:bg-[#FFFFFF]/5 transition-all duration-200 translate-x-1">
<span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
<span>Products</span>
</Link>
</li>
<li>
<Link href="/admin/Order" className="flex items-center gap-4 px-8 py-4 text-[#1C1C19]/60 dark:text-[#FCF9F4]/60 hover:bg-[#FFFFFF]/80 dark:hover:bg-[#FFFFFF]/10 hover:text-[#1C1C19] transition-all">
<span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
<span>Orders</span>
</Link>
</li>
{/* <li>
<Link href="./Settings" className="flex items-center gap-4 px-8 py-4 text-[#1C1C19]/60 dark:text-[#FCF9F4]/60 hover:bg-[#FFFFFF]/80 dark:hover:bg-[#FFFFFF]/10 hover:text-[#1C1C19] transition-all">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span>Settings</span>
</Link>
</li> */}
</ul>
</nav>
<div className="px-8 pt-8 border-t border-outline-variant/10">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-surface-container-highest flex items-center justify-center">
<span className="material-symbols-outlined text-sm" data-icon="person">person</span>
</div>
<div className="overflow-hidden">
<p className="truncate text-[10px] font-bold">Admin User</p>
<p className="truncate text-[8px] opacity-50">saadmirzapak@gmail.com</p>
</div>
</div>
</div>
</aside>
    
)

}