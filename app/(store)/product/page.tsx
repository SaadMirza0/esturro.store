"use client"

export default function Products() {
    return (
        <main>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start mb-24">

                <div className="relative group cursor-zoom-in bg-surface-container-lowest p-4">
                    <img alt="Midnight Bloom Printed Shirt" className="w-full aspect-[4/5] object-cover" data-alt="studio photograph of a high-end mens short sleeve shirt with a sophisticated dark floral print on a clean white background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrccvfPUrcjqTRFSF4HglikvwKaLzzh_PGNY2IkiNEnpEDUL_l2VoWeWF-z6qCQ3p3YzJz68Ga4J0CA39rkTzLOph1PZT17jRU6wxSgcNz-iBzFm_U0QWv4oFRR22AkTrTkihF781ZaBF7BdI5L-BJ5ax5g-dXi81rL9F4C-TMp0sE-_7Uw_Hh4QM8DPLsqFT5kQaqPMFwVUghHVtnXcmdbSnSKX_LiERWX36zyqQ3potwdGXPrgCJfffUIS3NXdAn5p3cX6ypk9c" />
                    <div className="absolute top-8 right-8 bg-white/80 backdrop-blur-md p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="material-symbols-outlined text-on-surface">zoom_in</span>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="mb-2 flex gap-2">
                        <span className="font-body text-[10px] tracking-widest uppercase py-1 px-3 bg-primary-container/10 text-primary font-bold">Printed</span>
                        <span className="font-body text-[10px] tracking-widest uppercase py-1 px-3 bg-primary-container/10 text-primary font-bold">Casual</span>
                        <span className="font-body text-[10px] tracking-widest uppercase py-1 px-3 bg-primary-container/10 text-primary font-bold">Summer</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-headline italic mb-4 leading-tight">Midnight Bloom Printed Shirt</h1>
                    <p className="text-3xl font-body font-light mb-8 tracking-tighter">₨2,999</p>
                    <div className="space-y-6 mb-10">
                        <p className="font-body text-sm leading-relaxed text-on-surface/80 max-w-md">
                            Premium breathable cotton with original floral print. Perfect for everyday wear and special occasions. Tailored fit for the modern Pakistani man.
                        </p>
                        <div className="h-px w-24 bg-outline-variant/30"></div>
                    </div>

                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-body text-[11px] tracking-widest uppercase font-bold">Select Size</span>
                            <button className="font-body text-[11px] tracking-widest uppercase text-primary underline underline-offset-4 italic">Size Guide</button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button className="w-14 h-14 flex items-center justify-center border border-outline-variant/30 font-body text-sm hover:border-on-surface transition-all">S</button>
                            <button className="w-14 h-14 flex items-center justify-center bg-primary text-white font-body text-sm font-bold shadow-lg shadow-primary/20">M</button>
                            <button className="w-14 h-14 flex items-center justify-center border border-outline-variant/30 font-body text-sm hover:border-on-surface transition-all">L</button>
                            <button className="w-14 h-14 flex items-center justify-center border border-outline-variant/30 font-body text-sm hover:border-on-surface transition-all">XL</button>
                            <button className="w-14 h-14 flex items-center justify-center border border-outline-variant/30 font-body text-sm hover:border-on-surface transition-all">2XL</button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button className="w-full bg-[#D4AF77] text-on-surface py-5 px-8 font-body font-extrabold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all hover:brightness-105 active:scale-[0.98]">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
                            Buy on WhatsApp
                        </button>
                        <button className="w-full bg-[#1C1C19] text-[#D4AF77] py-5 px-8 font-body font-extrabold uppercase tracking-[0.2em] text-xs transition-all hover:bg-black active:scale-[0.98]">
                            Buy Now
                        </button>
                    </div>
                </div>
            </section>

            <section className="border-t border-outline-variant/20 pt-20 pb-20">
                <h2 className="text-3xl md:text-4xl font-headline mb-12">You May Also Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden mb-6 bg-surface-container-lowest transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(28,28,25,0.04)]">
                            <img alt="Urban Khaki" className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="luxurious khaki green casual shirt made of premium fabric on a minimalist studio background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAjyvm6GEyAe2ktpP0A61VKIRUerLDET_z-n3Z8l0--ibtyAvKdhKnX8SEpHrE7qDh-yrO0fNvanPPZGLfIB2e-aQDXct3q_mPvEKlVN3kmNxiipAlovnZvhTi62aCxO44gzwQe0XoXi-HRqXH7igZF2yIBGRsihma08LUhUGY1gEcI5DMzegVBj4M4jrmZYO6DUp2Wz1twzxAAbyIvUntdERkCYPxV_zZhPy8wwk5G-c2b2HgTZevAwLkRNHEvUDna3ZG4SSGjCM" />
                            <div className="absolute top-4 left-4">
                                <span className="font-body text-[8px] tracking-widest uppercase py-1 px-2 bg-primary-container text-on-surface font-bold">New</span>
                            </div>
                        </div>
                        <div className="px-2">
                            <p className="font-body text-[10px] tracking-widest uppercase text-primary font-bold mb-1">Essentials</p>
                            <h3 className="text-xl font-headline mb-2">Urban Khaki Shirt</h3>
                            <p className="font-body text-sm tracking-tighter">₨3,499</p>
                        </div>
                    </div>

                </div>
            </section>
        </main>

    );
}