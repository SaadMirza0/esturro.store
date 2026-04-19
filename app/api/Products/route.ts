import { NextResponse } from "next/server";
import { sql } from "@/lib/db";



export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const style = searchParams.get("style");
    const size = searchParams.get("size");
    const limit = searchParams.get("limit");

    let query = "SELECT * FROM shirts WHERE 1=1";
    const values: any[] = [];

    if (style && style !== "") {
      values.push(style);
      query += ` AND design_style = $${values.length}`;
    }

    if (size && size !== "") {
      values.push(`%${size}%`);
      query += ` AND available_sizes ILIKE $${values.length}`;
    }

    query += " ORDER BY created_at DESC";

    if (limit && !isNaN(Number(limit))) {
      query += ` LIMIT ${Number(limit)}`;
    }

    // 1. Execute the query with values
    const result = await sql.query(query, values);



    // 2. IMPORTANT: Return the WHOLE 'result' object to match your working version
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json([], { status: 500 });
  }
}




export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, category_name, design_style, season, available_sizes, image_url } = body;


    await sql`
      INSERT INTO shirts (name, description, price, category_name, design_style, season, available_sizes, image_url)
      VALUES (${name}, ${description}, ${price}, ${category_name}, ${design_style}, ${season}, ${available_sizes}, ${image_url})
    `;

    return NextResponse.json({ message: "Product created successfully" }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}




