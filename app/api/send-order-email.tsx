import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { customerEmail, customerName, adminEmail, subject, customerHtml, adminHtml, orderData } = await req.json();

    // Send email to customer
    await sgMail.send({
      to: customerEmail,
      from: {
        email: process.env.EMAIL_FROM!,
        name: "UTS Rwanda Fashion",
      },
      subject: subject,
      html: customerHtml,
    });

    // Send notification to admin
    await sgMail.send({
      to: adminEmail,
      from: {
        email: process.env.EMAIL_FROM!,
        name: "UTS Rwanda Orders",
      },
      subject: `New Order: #${orderData.orderId}`,
      html: adminHtml,
    });

    // You could save order data to a database here
    // const savedOrder = await db.orders.create({ data: orderData });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}