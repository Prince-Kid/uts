import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid with your API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log("SendGrid API key configured successfully");
} else {
  console.error("SendGrid API key is missing!");
}

export async function POST(req: NextRequest) {
  try {
    const { customerEmail, customerName, adminEmail, subject, customerHtml, adminHtml, orderData } = await req.json();
    
    console.log(`Preparing to send email to customer: ${customerEmail}`);

    // Create a plain text version of the email (improves deliverability)
    const plainTextContent = `
Order Confirmation: #${orderData.orderId}

Dear ${customerName},

Thank you for your order with UTS Rwanda! Your order has been received and is being processed.

Order Total: ${new Intl.NumberFormat('en-RW', {
  style: 'currency',
  currency: 'RWF',
  minimumFractionDigits: 0,
}).format(orderData.total)}

Delivery Address:
${orderData.customerInfo.address}

For any questions about your order, please contact us at support@utsrwanda.com.

Thank you for shopping with UTS Rwanda!
`;

    // Basic email structure focused on reliable delivery
    const customerMessage = {
      to: customerEmail,
      from: process.env.EMAIL_FROM || 'noreply@utsrwanda.com', // Make sure this is verified in SendGrid
      subject: `Order Confirmation #${orderData.orderId}`,
      text: plainTextContent,
      html: customerHtml,
      // Disable tracking to improve deliverability
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
        subscriptionTracking: { enable: false },
      },
    };

    try {
      console.log("Sending customer email...");
      const [customerResponse] = await sgMail.send(customerMessage);
      console.log(`Customer email sent! Status code: ${customerResponse.statusCode}`);
    } catch (emailError: any) {
      console.error("Error sending customer email:", emailError);
      if (emailError.response) {
        console.error("Response body:", emailError.response.body);
      }
      // Continue to admin email even if customer email fails
    }

    // Plain text for admin notification
    const adminPlainText = `
New Order Received: #${orderData.orderId}

Customer: ${customerName} (${customerEmail})
Order Date: ${new Date(orderData.orderDate).toLocaleString()}
Total Amount: ${new Intl.NumberFormat('en-RW', {
  style: 'currency',
  currency: 'RWF',
  minimumFractionDigits: 0,
}).format(orderData.total)}

Shipping Address:
${orderData.customerInfo.address}

Customer Phone: ${orderData.customerInfo.phone}
`;

    // Send notification to admin (simpler format)
    const adminMessage = {
      to: adminEmail || process.env.ADMIN_EMAIL || 'admin@utsrwanda.com',
      from: process.env.EMAIL_FROM || 'noreply@utsrwanda.com',
      subject: `New Order: #${orderData.orderId}`,
      text: adminPlainText,
      html: adminHtml,
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
      },
    };

    try {
      console.log("Sending admin notification...");
      const [adminResponse] = await sgMail.send(adminMessage);
      console.log(`Admin email sent! Status code: ${adminResponse.statusCode}`);
    } catch (emailError: any) {
      console.error("Error sending admin email:", emailError);
      if (emailError.response) {
        console.error("Response body:", emailError.response.body);
      }
      // Continue with the response even if admin email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: "Order processed successfully",
      orderData: {
        id: orderData.orderId,
        date: orderData.orderDate
      }
    });
  } catch (error) {
    console.error("Error in send-order-email API route:", error);
    
    // Detailed error reporting
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return NextResponse.json({ 
      success: false, 
      error: "Failed to process order", 
      details: errorMessage
    }, { status: 500 });
  }
}