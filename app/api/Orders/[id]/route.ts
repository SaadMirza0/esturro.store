import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    
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



export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Fetch existing order to merge updates
    const existing = await sql`SELECT * FROM orders WHERE id = ${id} LIMIT 1`;
    if (!existing || existing.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const currentOrder = existing[0];
    const updated = {
      status: body.status ?? currentOrder.status,
      full_name: body.full_name ?? currentOrder.full_name,
      phone: body.phone ?? currentOrder.phone,
      city: body.city ?? currentOrder.city,
      address: body.address ?? currentOrder.address,
    };

    // Update the record in the database
    await sql`
      UPDATE orders 
      SET 
        status = ${updated.status},
        full_name = ${updated.full_name},
        phone = ${updated.phone},
        city = ${updated.city},
        address = ${updated.address}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: "Atelier Record Updated" }, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;


    await sql`DELETE FROM orders WHERE id = ${id}`;

    return NextResponse.json({ message: "Record Purged from Archive" }, { status: 200 });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
