import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for demo notifications
  app.post("/api/notify-demo", async (req, res) => {
    const { schoolName, contactName, email, phone, id } = req.body;

    // Log the event
    console.log(`New Demo Request: ${schoolName} from ${contactName} (${email}, ${phone}) with ID: ${id}`);

    // Prepare email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Construct the deep link
    // Assuming the admin dashboard is the default view when logged in
    const adminLink = `${process.env.APP_URL || 'http://localhost:3000'}?leadId=${id}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "pritahmraj9935@gmail.com",
      subject: `New Demo Request: ${schoolName}`,
      text: `
        You have a new demo request!
        
        School Name: ${schoolName}
        Contact Name: ${contactName}
        Email: ${email}
        Phone: ${phone}
        
        View Lead Details:
        ${adminLink}
        
        This request has been saved to your Firestore database.
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4f46e5;">New Demo Request</h2>
          <p>You have received a new request for a free pilot.</p>
          
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>School:</strong> ${schoolName}</p>
            <p><strong>Contact:</strong> ${contactName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          
          <a href="${adminLink}" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Open in Admin Dashboard
          </a>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            This is an automated notification from Schoolly.
          </p>
        </div>
      `
    };

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
        console.log("Notification email sent successfully.");
      } else {
        console.warn("EMAIL_USER or EMAIL_PASS not set. Notification email skipped.");
      }
      res.status(200).json({ success: true, message: "Notification handled" });
    } catch (error: any) {
      if (error.message?.includes('Application-specific password required')) {
        console.error("\n[CRITICAL HELP] Gmail Error: Invalid login credentials.");
        console.error("1. For Gmail, you MUST use an 'App Password', not your regular password.");
        console.error("2. Go to: https://myaccount.google.com/apppasswords");
        console.error("3. Update EMAIL_PASS in settings with the 16-character code.\n");
      } else {
        console.error("Error sending email:", error);
      }
      // We don't want to fail the whole request just because email failed
      res.status(200).json({ success: true, message: "Data saved, email failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
