import { Suspense } from "react";
import CheckoutContent from "./CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1C1C19] flex items-center justify-center text-white font-serif italic">Loading Order Protocol...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
