"use client";

export default function About() {
    return (
     <main>

<section className="bg-[#F8F5F0] pt-24 pb-32 px-8 overflow-hidden relative">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-12">
<div className="max-w-2xl">
<span className="font-label uppercase tracking-[0.3em] text-[10px] text-primary mb-6 block">Legacy in the Making</span>
<h1 className="text-7xl md:text-9xl font-headline font-bold leading-[0.9] tracking-tighter text-on-surface mb-8">
                        About <br/> Esturro
                    </h1>
<p className="font-headline italic text-2xl text-on-surface-variant max-w-md">
                        Crafted with pride in Pakistan since 2026.
                    </p>
</div>
<div className="md:w-1/3 hidden lg:block opacity-20">
<span className="text-[200px] leading-none font-headline font-black select-none pointer-events-none">EST.</span>
</div>
</div>
</section>

<section className="bg-surface py-24 px-8 md:px-16">
<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
<div className="lg:col-span-7 space-y-12">
<div className="relative">
<h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-8 relative z-10">
                            The Esturro Standard.
                        </h2>
<div className="absolute -top-4 -left-4 w-12 h-12 bg-primary-container/20"></div>
</div>
<div className="max-w-xl">
<p className="text-xl md:text-2xl font-headline leading-relaxed text-on-surface italic mb-8">
                            "We craft every shirt with the perfect fit in mind – premium breathable fabrics, original prints, and uncompromising quality for the modern Pakistani man."
                        </p>
<p className="text-on-surface-variant font-body leading-loose">
                            At Esturro, we believe that garments are not just fabric; they are a reflection of an individual’s journey. Our atelier focuses on slow-fashion principles, ensuring that every stitch serves a purpose. By sourcing the finest indigenous cotton and blending it with modern silhouettes, we’ve created a standard that transcends seasons.
                        </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
<div className="space-y-4">
<span className="material-symbols-outlined text-primary text-4xl">eco</span>
<h3 className="font-headline font-bold text-lg uppercase tracking-wider">Premium Pakistani Cotton</h3>
<p className="text-sm font-body text-on-surface-variant leading-relaxed">Hand-selected fibers for unparalleled breathability.</p>
</div>
<div className="space-y-4">
<span className="material-symbols-outlined text-primary text-4xl">ink_pen</span>
<h3 className="font-headline font-bold text-lg uppercase tracking-wider">Original Signature Prints</h3>
<p className="text-sm font-body text-on-surface-variant leading-relaxed">Artisan-designed patterns exclusive to the Esturro house.</p>
</div>
<div className="space-y-4">
<span className="material-symbols-outlined text-primary text-4xl">straighten</span>
<h3 className="font-headline font-bold text-lg uppercase tracking-wider">Perfect Everyday Fit</h3>
<p className="text-sm font-body text-on-surface-variant leading-relaxed">Engineered for comfort without sacrificing sharp geometry.</p>
</div>
</div>
</div>

<div className="lg:col-span-5 relative">
<div className="relative z-10 bg-surface-container-lowest p-4 shadow-xl">
<img className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair" data-alt="A confident Pakistani man wearing a premium printed Esturro shirt standing in a minimalist modern urban architectural setting with clean lines" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOU43_bjdQlyMNDcfdUu6mrcWl8gUUNtAT5oKGtwFLPY23QJ7BTTg3j_a2ov60uggW5BQNx8t6cFa8R96V46uNoucAmVRF6C0jvN3awqm8DmO6SqSG1YdRKlrrmU9wjftiiYCCgMtiWv31J4bXrKLjgKode2FfnfGpPIxXWBXEvNOKx2TddFojWhJrZtEOhS_LD9pJ_yYJLCEdwJ-xxEsG4ucapmB1LT2LUqFSjV_CCUe0ISMAt-GFOaEO7jg1jhEBROE8BvNgnFE"/>
</div>

<div className="absolute -bottom-10 -right-10 w-full h-full border border-primary/20 -z-0"></div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest py-32 px-8">
<div className="max-w-4xl mx-auto text-center space-y-10">
<h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface leading-tight">
                    Ready to experience the <br/> <span className="italic text-primary">Esturro difference?</span>
</h2>
<div className="flex justify-center">
<button className="bg-primary-container hover:bg-primary text-on-surface hover:text-white px-12 py-5 font-headline font-bold uppercase tracking-[0.2em] text-sm transition-all duration-500 group relative overflow-hidden">
<span className="relative z-10">Explore the Collection</span>
</button>
</div>
</div>
</section>
</main>
    );
}