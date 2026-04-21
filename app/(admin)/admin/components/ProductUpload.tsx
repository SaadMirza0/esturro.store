"use client";
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";

// 1. Define Props to accept data from the Edit button
interface ProductUploadProps {
  initialData?: any;
  onSuccess?: () => void;
}

export default function ProductUpload({ initialData, onSuccess }: ProductUploadProps) {
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");
  const [sizes, setSizes] = useState<string[]>(
    initialData?.available_sizes ? initialData.available_sizes.split(", ") : []
  );
  const [loading, setLoading] = useState(false);

  // Sync state if initialData changes (when switching between different edits)
  useEffect(() => {
    if (initialData) {
      setImageUrl(initialData.image_url || "");
      setSizes(initialData.available_sizes ? initialData.available_sizes.split(", ") : []);
    }
  }, [initialData]);

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) return alert("Please upload an image first!");

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const productData = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      category_name: formData.get("category"),
      design_style: formData.get("style"),
      season: formData.get("season"),
      available_sizes: sizes.join(", "),
      image_url: imageUrl,
    };

    // Determine if we are creating NEW or UPDATING existing
    const url = initialData ? `/api/Products/${initialData.id}` : "/api/Products";
    const method = initialData ? "PATCH" : "POST";

    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      alert(initialData ? "Product Updated!" : "Product Published!");
      if (onSuccess) onSuccess(); 
      else window.location.reload();
    } else {
      alert("Error saving product.");
    }
    setLoading(false);
  };

  return (
    <section className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-10">
            <div className="relative">
              <label className="block font-manrope uppercase tracking-widest text-[10px] font-bold text-on-surface-variant mb-2">Product Name</label>
              <input 
                name="name" 
                defaultValue={initialData?.name} 
                required 
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 text-xl font-headline focus:border-primary transition-colors placeholder:text-on-surface-variant/30" 
                placeholder="e.g. The Midnight Linen Kurta" 
                type="text" 
              />
            </div>
            <div className="relative">
              <label className="block font-manrope uppercase tracking-widest text-[10px] font-bold text-on-surface-variant mb-2">Description</label>
              <textarea 
                name="description" 
                defaultValue={initialData?.description} 
                required 
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 font-body leading-relaxed focus:border-primary transition-colors placeholder:text-on-surface-variant/30 resize-none" 
                placeholder="Describe details..." 
                rows={4}
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="relative">
              <label className="block font-manrope uppercase tracking-widest text-[10px] font-bold text-on-surface-variant mb-2">Price (PKR)</label>
              <div className="flex items-center">
                <span className="font-headline text-lg text-primary mr-2 italic">Rs.</span>
                <input 
                  name="price" 
                  defaultValue={initialData?.price} 
                  required 
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 text-xl font-headline focus:border-primary transition-colors placeholder:text-on-surface-variant/30" 
                  type="number" 
                />
              </div>
            </div>
            <div className="relative">
              <label className="block font-manrope uppercase tracking-widest text-[10px] font-bold text-on-surface-variant mb-2">Category Name</label>
              <input 
                name="category" 
                defaultValue={initialData?.category_name} 
                required 
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 font-body focus:border-primary transition-colors" 
                type="text" 
              />
            </div>
            <div className="relative">
              <label className="block font-manrope uppercase tracking-widest text-[10px] font-bold text-on-surface-variant mb-2">Design Style</label>
              <select name="style" defaultValue={initialData?.design_style} className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 font-body">
                <option>Casual</option>
                <option>Printed</option>
                <option>Formal Heritage</option>
              </select>
            </div>
            <div className="relative">
              <label className="block font-manrope uppercase tracking-widest text-[10px] font-bold text-on-surface-variant mb-2">Season</label>
              <select name="season" defaultValue={initialData?.season} className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 font-body">
                <option>Summer</option>
                <option>Winter</option>
                <option>Spring/Autumn</option>
                <option>All Season</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-manrope uppercase tracking-widest text-[10px] font-bold text-on-surface-variant mb-6">Available Sizes</label>
            <div className="flex flex-wrap gap-4">
              {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                <label key={size} className="group cursor-pointer">
                  <input 
                    className="hidden peer" 
                    type="checkbox" 
                    checked={sizes.includes(size)}
                    onChange={() => toggleSize(size)} 
                  />
                  <div className="px-6 py-4 border border-outline-variant/30 peer-checked:bg-black peer-checked:text-white transition-all text-xs font-bold tracking-widest">{size}</div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-10">
       <CldUploadWidget 
  uploadPreset="shirt_uploads" 
  onSuccess={(result: any) => setImageUrl(result.info.secure_url)}
>
  {({ open }) => (
    <div className="space-y-6 w-full">
      {/* 1. UPLOAD BOX (Smaller now to make room for gallery) */}
      <div 
        onClick={() => open()} 
        className={`bg-surface-container-low p-6 relative min-h-[200px] flex flex-col items-center justify-center border-2 border-dashed transition-all cursor-pointer ${imageUrl ? 'border-green-500/50' : 'border-outline-variant/20 hover:border-primary/40'}`}
      >
        <div className="text-center space-y-2">
          <span className="material-symbols-outlined text-3xl text-primary font-light">
            {imageUrl ? 'sync' : 'cloud_upload'}
          </span>
          <h3 className="font-serif text-xl italic tracking-tight">
            {imageUrl ? 'Change Product Archive' : 'Upload Product PDF'}
          </h3>
          <p className="text-[9px] uppercase tracking-[0.2em] opacity-40">
            Supports Multi-Page Lookbooks (Up to 5 Views)
          </p>
        </div>
      </div>

      {/* 2. DYNAMIC LOOKBOOK PREVIEW (The Solution) */}
      {imageUrl && (
        <div className="space-y-4">
          <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#D4AF77]">Extracted Silhouettes</h4>
          
          {/* Grid that adjusts based on count */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5].map((pageNumber) => (
              <div 
                key={pageNumber} 
                className="relative aspect-[3/4] bg-[#F6F3EE] border border-outline-variant/10 overflow-hidden group"
              >
                <img  
                  src={imageUrl
                    .replace("/upload/", `/upload/pg_${pageNumber}/`)
                    .replace(".pdf", ".jpg")
                  } 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={`View ${pageNumber}`}
                  // Optional: hide the box if the PDF page doesn't exist
                  onError={(e: any) => e.target.parentElement.style.display = 'none'}
                />
                
                {/* Page Label */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm border border-black/5 px-2 py-0.5 shadow-sm">
                  <span className="text-[8px] font-black uppercase tracking-tighter">View 0{pageNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )}
</CldUploadWidget>



          <div className="pt-10">
            <button disabled={loading} className="w-full bg-black text-white py-6 px-12 font-manrope uppercase tracking-[0.2em] text-sm font-bold shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50" type="submit">
              {loading ? "Saving..." : initialData ? "Update Piece" : "Publish Piece"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
