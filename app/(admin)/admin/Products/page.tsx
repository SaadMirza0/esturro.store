"use client";
import { useEffect, useState } from "react";
import ProductUpload from "../components/ProductUpload";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchProducts = async () => {
    try {
      // Ensure this path matches your folder name exactly
      const res = await fetch("/api/Products", { cache: 'no-store' });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server Error Page:", errorText);
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      // Only set if data is an array
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Frontend Fetch Error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const deleteProduct = async (id: number) => {
  if (!confirm("Are you sure you want to delete this piece?")) return;
  try {
    const res = await fetch(`/api/Products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts(products.filter((p) => p.id !== id));
    }
  } catch (error) {
    console.error("Delete Error:", error);
  }
};

  if (loading) return <div className="p-20 text-center font-manrope uppercase tracking-widest text-[10px]">Loading Archive...</div>;

  return (
    <>
      <div className="flex justify-between items-end mb-16 border-b border-outline-variant/10 pb-8">
        <div>
          <h2 className="text-5xl font-bold text-on-surface tracking-tighter mb-2">Inventory Management</h2>
          <p className="font-body text-on-surface-variant max-w-md uppercase tracking-[0.2em] text-[10px]">Curating the Esturro Seasonal Collection</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-surface-tint text-on-primary px-10 py-4 font-body text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Add New Product
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl p-10">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
             <ProductUpload 
    initialData={editingProduct} 
    onSuccess={() => {
      setIsOpen(false);
      setEditingProduct(null);
      fetchProducts(); // Refresh the table
    }} 
  />
          </div>
        </div>
      )}

      <div className="bg-surface-container-lowest shadow-[0_20px_40px_rgba(28,28,25,0.04)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/10">
              <th className="px-8 py-6 font-body text-[10px] uppercase tracking-widest text-on-surface-variant">Visual</th>
              <th className="px-8 py-6 font-body text-[10px] uppercase tracking-widest text-on-surface-variant">Product Identity</th>
              <th className="px-8 py-6 font-body text-[10px] uppercase tracking-widest text-on-surface-variant">Category</th>
              <th className="px-8 py-6 font-body text-[10px] uppercase tracking-widest text-on-surface-variant">Investment (PKR)</th>
              <th className="px-8 py-6 font-body text-[10px] uppercase tracking-widest text-on-surface-variant">Status</th>
              <th className="px-8 py-6 font-body text-[10px] uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {/* Added check to prevent .map error */}
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="group hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="w-16 h-20 bg-surface-container flex items-center justify-center overflow-hidden">
                    <img
  alt={product.name}
  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
  src={product.image_url?.toLowerCase().endsWith(".pdf") 
    ? product.image_url.replace(".pdf", ".jpg") 
    : product.image_url
  }
/>

                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-headline text-lg font-bold">{product.name}</div>
                    <div className="text-[10px] font-body text-on-surface-variant/60 uppercase tracking-wider">
                      ID: #{product.id?.toString().padStart(4, '0')}
                    </div>
                  </td>
                  <td className="px-8 py-6 font-body text-xs uppercase tracking-widest text-on-surface-variant">
                    {product.design_style} / {product.category_name}
                  </td>
                  <td className="px-8 py-6 font-body font-bold text-sm">
                    {Number(product.price).toLocaleString()}
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary font-body text-[9px] uppercase font-bold tracking-tighter">
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      In Stock
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-4">
                      <button 
  onClick={() => {
    setEditingProduct(product);
    setIsOpen(true);
  }}
  className="text-on-surface/40 hover:text-primary transition-colors"
>
  <span className="material-symbols-outlined text-lg">edit</span>
</button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-on-surface/40 hover:text-red-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-8 py-20 text-center font-body text-xs text-on-surface-variant/40 uppercase tracking-[0.2em]">
                  No inventory pieces found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="px-8 py-6 flex justify-between items-center bg-surface-container-low border-t border-outline-variant/10">
          <p className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant opacity-60">
            Showing {products.length} Archive Pieces
          </p>
        </div>
      </div>
    </>
  )
}
