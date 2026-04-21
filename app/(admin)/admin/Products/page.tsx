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
  
      const res = await fetch("/api/Products", { cache: 'no-store' });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server Error Page:", errorText);
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
   
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
 
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-gray-200">
    <div className="mb-4 md:mb-0">
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Inventory Management</h2>
      <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Seasonal Collection Control</p>
    </div>
    <button
      onClick={() => {
        setEditingProduct(null);
        setIsOpen(true);
      }}
      className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-gray-800 active:scale-95 flex items-center gap-2 shadow-sm"
    >
      <span className="material-symbols-outlined text-sm">add</span>
      Add Product
    </button>
  </div>

  
  {isOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white px-8 py-4 border-b border-gray-100 flex justify-between items-center z-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-600">
            {editingProduct ? 'Edit Product Detail' : 'New Archive Entry'}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-black p-2 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-8">
          <ProductUpload 
            initialData={editingProduct} 
            onSuccess={() => {
              setIsOpen(false);
              setEditingProduct(null);
              fetchProducts();
            }} 
          />
        </div>
      </div>
    </div>
  )}


  <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-[10px] uppercase font-bold text-gray-500 tracking-wider">Visual</th>
            <th className="px-6 py-4 text-[10px] uppercase font-bold text-gray-500 tracking-wider">Product Detail</th>
            <th className="px-6 py-4 text-[10px] uppercase font-bold text-gray-500 tracking-wider">Specs</th>
            <th className="px-6 py-4 text-[10px] uppercase font-bold text-gray-500 tracking-wider">Price</th>
            <th className="px-6 py-4 text-[10px] uppercase font-bold text-gray-500 tracking-wider">Status</th>
            <th className="px-6 py-4 text-[10px] uppercase font-bold text-gray-500 tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-16 bg-gray-100 border border-gray-200 overflow-hidden">
                   <img
  alt={product.name}
  className="w-full h-full object-cover"
  src={(() => {
    const firstImage = product.image_url?.split(',')[0] || "";
    return firstImage.toLowerCase().endsWith(".pdf") 
      ? firstImage.replace(".pdf", ".jpg") 
      : firstImage;
  })()}
/>

                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{product.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">#{product.id?.toString().padStart(4, '0')}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-gray-600 font-medium uppercase tracking-tighter">
                    {product.design_style} <span className="text-gray-300 mx-1">|</span> {product.category_name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">₨ {Number(product.price).toLocaleString()}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100">
                    In Stock
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => {
                        setEditingProduct(product);
                        setIsOpen(true);
                      }}
                      className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ) )
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-20 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest">No products found in archive.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">
        Registry: {products.length} Total Pieces
      </p>
    </div>
  </div>
</>

  )
}
