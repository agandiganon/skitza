import { NextResponse } from "next/server";
import { submitContactLead } from "@/lib/contact/submitContactLead";
import type { ContactFormFieldErrors } from "@/types/contactForm";

const MAX_CONTENT_LENGTH = 20_000;

export const runtime = "nodejs";

function firstFieldError(fieldErrors: ContactFormFieldErrors): string | null {
  return Object.values(fieldErrors).find(Boolean) ?? null;
}

function getFirstHeaderValue(headerValue: string | null) {
  return headerValue?.split(",")[0]?.trim() || null;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json({ error: "תוכן הבקשה לא תקין" }, { status: 415 });
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_CONTENT_LENGTH) {
      return NextResponse.json({ error: "הבקשה גדולה מדי" }, { status: 413 });
    }

    if (!rawBody.trim()) {
      return NextResponse.json({ error: "נתוני הבקשה לא תקינים" }, { status: 400 });
    }

    let raw: unknown;
    try {
      raw = JSON.parse(rawBody) as unknown;
    } catch {
      return NextResponse.json({ error: "פורמט JSON לא תקין" }, { status: 400 });
    }

    if (!raw || typeof raw !== "object") {
      return NextResponse.json({ error: "נתוני הבקשה לא תקינים" }, { status: 400 });
    }

    const result = await submitContactLead(raw, {
      ipAddress:
        getFirstHeaderValue(request.headers.get("x-forwarded-for")) ||
        getFirstHeaderValue(request.headers.get("cf-connecting-ip")) ||
        getFirstHeaderValue(request.headers.get("x-real-ip")),
      userAgent: request.headers.get("user-agent"),
      submittedVia: "api_contact",
    });
    if (!result.success) {
      return NextResponse.json(
        { error: result.formError || firstFieldError(result.fieldErrors) || "שגיאה בנתונים" },
        { status: result.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/contact] unexpected error", error);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
  }
}
