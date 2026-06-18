import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendBookingConfirmationEmail(customerEmail: string, customerName: string) {
  try {
    await transporter.sendMail({
      from: `"Pure Lifestyle Yoga" <${process.env.SMTP_USER}>`,
      to: customerEmail,
      subject: "Booking Request Received - Pure Lifestyle Yoga",
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto;">
          <h2 style="color: #047857;">Hello ${customerName},</h2>
          <p>Thank you for choosing Pure Lifestyle Yoga!</p>
          <p>We have successfully received your booking request for a personalized yoga session. 
          Our team is currently reviewing your request and will contact you shortly to confirm the details and match you with your trainer.</p>
          <br/>
          <p>Stay well,</p>
          <p><strong>The Pure Lifestyle Yoga Team</strong></p>
        </div>
      `,
    });
    console.log("Confirmation email sent to", customerEmail);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
