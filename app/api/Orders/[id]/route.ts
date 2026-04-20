import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Fetch order details by ID
    const order = await sql`
      SELECT * FROM orders 
      WHERE id = ${id}
      LIMIT 1
    `;

    if (!order || order.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order[0]);
  } catch (error: any) {
    console.error("Order Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
