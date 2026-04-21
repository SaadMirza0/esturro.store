import { NextResponse } from "next/server";
import { sql } from "@/lib/db";


export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await sql`DELETE FROM shirts WHERE id = ${id}`;
    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}


export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    await sql`
      UPDATE shirts 
      SET name=${body.name}, description=${body.description}, price=${body.price}, 
          category_name=${body.category_name}, design_style=${body.design_style}, 
          season=${body.season}, available_sizes=${body.available_sizes}, image_url=${body.image_url}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: "Updated Successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
