import { NextResponse } from "next/server";
import { sql } from "@/lib/db";



export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Destructure exactly what you sent from the frontend
    const {
      full_name,
      email,
      phone,
      city,
      province,
      address,
      payment_method,
      total_amount,
      product_name,
      size
    } = body;

    // Simple validation
    if (!full_name || !phone || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into Postgres
    await sql`
      INSERT INTO orders (
        full_name, 
        email, 
        phone, 
        city, 
        province, 
        address, 
        payment_method, 
        total_amount,
        product_name,
        size
      )
      VALUES (
        ${full_name}, 
        ${email}, 
        ${phone}, 
        ${city}, 
        ${province}, 
        ${address}, 
        ${payment_method}, 
        ${total_amount},
        ${product_name},
        ${size}
      )
    `;

    return NextResponse.json({ message: "Order created!" }, { status: 201 });

  } catch (error: any) {
    console.error("Order API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// 3. GET Route for Admin Dashboard
export async function GET() {
  try {
    const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
