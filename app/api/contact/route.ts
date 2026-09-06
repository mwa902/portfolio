import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Create transporter — uses Gmail SMTP with App Password
    // Set GMAIL_USER and GMAIL_APP_PASSWORD in your .env.local file
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to Wahad (notification)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: "ahmed.wahad49@gmail.com",
      subject: `📬 Portfolio: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; color: #f0f0f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #00e5ff, #7c3aed); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 22px; color: #fff;">New Portfolio Message</h1>
            <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Someone reached out via your portfolio</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; width: 90px;">From</td>
                <td style="padding: 10px 0; color: #f0f0f0; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #00e5ff;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">Subject</td>
                <td style="padding: 10px 0; color: #f0f0f0;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px; border-left: 3px solid #00e5ff;">
              <p style="margin: 0 0 8px; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em;">Message</p>
              <p style="margin: 0; color: #f0f0f0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>
            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #00e5ff, #7c3aed); color: #fff; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 14px;">
                Reply to ${name}
              </a>
            </div>
          </div>
          <div style="padding: 16px 32px; background: rgba(255,255,255,0.03); text-align: center; color: #94a3b8; font-size: 12px;">
            Wahad Ahmed · Portfolio · Lahore, Pakistan 🇵🇰
          </div>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Wahad Ahmed" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Re: ${subject} — Got your message!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; color: #f0f0f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #00e5ff, #7c3aed); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 22px; color: #fff;">Hey ${name}! 👋</h1>
            <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Thanks for reaching out</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #f0f0f0; line-height: 1.75; font-size: 15px;">
              I received your message about <strong style="color: #00e5ff;">"${subject}"</strong> and I'll get back to you as soon as possible — usually within 24 hours.
            </p>
            <div style="margin: 24px 0; padding: 20px; background: rgba(0,229,255,0.06); border-radius: 10px; border: 1px solid rgba(0,229,255,0.2);">
              <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Your message</p>
              <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.7;">
              In the meantime, feel free to check out my work on 
              <a href="https://github.com/wahad-ahmed" style="color: #00e5ff;">GitHub</a> or 
              connect on <a href="https://linkedin.com/in/wahad-ahmed" style="color: #00e5ff;">LinkedIn</a>.
            </p>
            <p style="color: #f0f0f0; font-size: 15px; margin-top: 24px;">
              Best regards,<br/>
              <strong style="color: #00e5ff;">Wahad Ahmed</strong><br/>
              <span style="color: #94a3b8; font-size: 13px;">Full-Stack Web Developer · Lahore, Pakistan</span>
            </p>
          </div>
          <div style="padding: 16px 32px; background: rgba(255,255,255,0.03); text-align: center; color: #94a3b8; font-size: 12px;">
            ahmed.wahad49@gmail.com · Lahore, Pakistan 🇵🇰
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
