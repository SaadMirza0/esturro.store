import { Suspense } from "react";
import StoreContent from "./StoreContent";

export default function StorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FCF9F4] flex items-center justify-center text-[#1C1C19] font-serif italic text-xl">Loading Archive...</div>}>
      <StoreContent />
    </Suspense>
  );
}
