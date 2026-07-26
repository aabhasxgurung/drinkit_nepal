import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  try {
    const { name, email, subject, message, phone } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const rows = [
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : "",
      phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : "",
      `<p><strong>Message:</strong></p>`,
      `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await resend.emails.send({
      from: "Drink It Nepal <contact@drinkitnepal.com>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New message from ${name} — Drink It Nepal`,
      html: `<div style="font-family: sans-serif; line-height: 1.6;">
        <h2>New Contact Form Submission</h2>
        ${rows}
      </div>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
