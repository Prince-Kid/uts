import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid with your API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log("SendGrid API key configured for contact form");
} else {
  console.error("SendGrid API key is missing for contact form!");
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    
    console.log(`Preparing to send contact email from: ${email}`);

    // Email to the site owner/admin
    const adminEmailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
      <div style="background-color: #3c5e9e; padding: 15px; text-align: center; border-radius: 5px 5px 0 0;">
        <h2 style="color: white; margin: 0;">New Contact Message from UTS Website</h2>
      </div>
      
      <div style="padding: 20px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #3c5e9e; border-radius: 4px;">
          <p style="margin: 0;"><strong>Message:</strong></p>
          <p style="margin: 10px 0 0; white-space: pre-wrap;">${message}</p>
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          This email was sent from the contact form on your UTS Rwanda website.
        </p>
      </div>
    </div>
    `;

    // Create plain text version for admin
    const adminPlainText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

This email was sent from the contact form on your UTS Rwanda website.
    `;

    // Email to the admin
    const adminMessage = {
      to: process.env.ADMIN_EMAIL || 'twizerimanaschadrack@gmail.com',
      from: process.env.EMAIL_FROM || 'noreply@utsrwanda.com',
      subject: `UTS Website Contact: ${subject}`,
      text: adminPlainText,
      html: adminEmailContent,
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
      },
    };

    // Auto-reply to the user
    const userEmailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
      <div style="background-color: #3c5e9e; padding: 15px; text-align: center; border-radius: 5px 5px 0 0;">
        <h2 style="color: white; margin: 0;">Thank You for Contacting UTS Rwanda</h2>
      </div>
      
      <div style="padding: 20px;">
        <p>Hello ${name},</p>
        <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
          <p style="margin: 0; font-style: italic;">Your message: "${subject}"</p>
        </div>
        
        <p>If your inquiry is urgent, please call us at +250 785 954 141.</p>
        
        <p>Best regards,<br>The UTS Rwanda Team</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #777;">
          <p>This is an automated response to your contact form submission.<br>Please do not reply to this email.</p>
        </div>
      </div>
    </div>
    `;

    // Create plain text version for user
    const userPlainText = `
Thank You for Contacting UTS Rwanda

Hello ${name},

Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.

Your message: "${subject}"

If your inquiry is urgent, please call us at +250 785 954 141.

Best regards,
The UTS Rwanda Team

This is an automated response to your contact form submission.
Please do not reply to this email.
    `;

    // Email to the user (auto-reply)
    const userMessage = {
      to: email,
      from: process.env.EMAIL_FROM || 'noreply@utsrwanda.com',
      subject: 'Thank You for Contacting UTS Rwanda',
      text: userPlainText,
      html: userEmailContent,
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
      },
    };
    
    try {
      // Send email to admin
      console.log("Sending notification to admin...");
      const [adminResponse] = await sgMail.send(adminMessage);
      console.log(`Admin notification sent! Status code: ${adminResponse.statusCode}`);
      
      // Send auto-reply to user
      console.log("Sending confirmation to user...");
      const [userResponse] = await sgMail.send(userMessage);
      console.log(`User confirmation sent! Status code: ${userResponse.statusCode}`);
    } catch (emailError: unknown) {
      console.error("Error sending contact emails:", emailError);
      if (emailError && typeof emailError === 'object' && 'response' in emailError && 
          emailError.response && typeof emailError.response === 'object' && 'body' in emailError.response) {
        console.error("Response body:", emailError.response.body);
      }
      throw emailError;
    }

    return NextResponse.json({ 
      success: true, 
      message: "Message sent successfully"
    });
  } catch (error) {
    console.error("Error in send-contact-email API route:", error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return NextResponse.json({ 
      success: false, 
      error: "Failed to send message", 
      details: errorMessage
    }, { status: 500 });
  }
}