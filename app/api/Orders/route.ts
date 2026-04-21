import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import nodemailer from "nodemailer";


export async function POST(request: Request) {
  try {
    const body = await request.json();

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

    if (!full_name || !phone || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert into Postgres
    const result = await sql`
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
      RETURNING id
    `;

    const orderId = result[0].id;
const nodemailer = require('nodemailer');


    // --- EMAIL NOTIFICATION LOGIC ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    
    const adminMail = {
      from: `"ESTURRO System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚨 New Order Received #EST-${orderId}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #D4AF77; color: #1C1C19;">
          <h2 style="color: #1C1C19; border-bottom: 1px solid #D4AF77; pb-2;">New Order Alert</h2>
          
          <div style="margin-top: 15px;">
            <p><strong>Customer:</strong> ${full_name}</p>
            <p><strong>Product:</strong> ${product_name} (${size})</p>
            <p><strong>Amount:</strong> ₨ ${total_amount.toLocaleString()}</p>
            <p><strong>Method:</strong> ${payment_method}</p>
          </div>

          <div style="margin-top: 15px; padding: 10px; background-color: #F6F3EE;">
            <p style="margin: 0; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Delivery Details:</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${address}</p>
            <p style="margin: 5px 0;"><strong>City:</strong> ${city}</p>
            <p style="margin: 5px 0;"><strong>Province:</strong> ${province}</p>
          </div>
          
          <p style="font-size: 11px; margin-top: 15px; color: #666;">Login to the Admin Panel to mark as "Dispatched".</p>
        </div>
      `,
    };


    // 2. Customer Notification (Confirmation)
    const customerMail = {
      from: '"Esturro Atelier" <saadmirzapak@gmail.com>',
      to: email,
      subject: "Your Order is Confirmed - ESTURRO",
      html: `
        <div style="font-family: serif; max-width: 600px; margin: auto; border: 1px solid #D4AF77; padding: 40px; color: #1C1C19;">
          <h1 style="text-align: center; color: #D4AF77; font-style: italic;">ESTURRO</h1>
          <p>Dear ${full_name},</p>
          <p>Your order <strong>#EST-${orderId}</strong> has been successfully placed at our atelier.</p>
          <div style="background: #F6F3EE; padding: 20px; margin: 20px 0;">
            <p><strong>Product:</strong> ${product_name}</p>
            <p><strong>Total:</strong> ₨ ${total_amount.toLocaleString()}</p>
          </div>
          <p style="font-size: 12px; opacity: 0.7;">We will contact you shortly regarding delivery.</p>
        </div>
      `,
    };

    // Send emails (Await to ensure they send before finishing the response)
    await transporter.sendMail(adminMail);
    if (email && email !== "N/A") {
      await transporter.sendMail(customerMail);
    }

    return NextResponse.json({ message: "Order created!", orderId }, { status: 201 });

  } catch (error: any) {
    console.error("Order API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
//https://www.tiktok.com/@esturro.shop?_r=1&_t=ZS-95h0OIXVe2W
//https://www.facebook.com/share/18H81gmrgR/?mibextid=wwXIfr
//https://www.instagram.com/esturro.store?igsh=MTQxZjh1c3N6NDk4eA%3D%3D&utm_source=qr
// 3. GET Route for Admin Dashboard
export async function GET() {
  try {
    const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
