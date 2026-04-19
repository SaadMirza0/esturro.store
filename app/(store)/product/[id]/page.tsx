import { sql } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductClientPage from "../../components/ProductClientPage";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    // Fetch main product
    const productData = await sql`SELECT * FROM shirts WHERE id = ${id}`;
    const product = productData[0];

    if (!product) notFound();

    const relatedProducts = await sql`SELECT * FROM shirts WHERE id != ${id} AND name NOT LIKE 'test%' LIMIT 3`;


    return <ProductClientPage product={product} relatedProducts={relatedProducts} />;
}
