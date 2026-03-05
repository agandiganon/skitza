import { NextResponse } from "next/server";
import type { ContactPayload } from "@/types/contact";
import { contactSchema } from "@/lib/schemas/contact.schema";
import { sendLeadEmail } from "@/lib/email/sendLeadEmail";

const MAX_CONTENT_LENGTH = 20_000;

export const runtime = "nodejs";

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

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const message = Object.values(first).flat().join(" ") || "שגיאה בנתונים";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const payload: ContactPayload = {
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      service: parsed.data.service,
    };

    await sendLeadEmail(payload);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/contact] unexpected error", error);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
  }
}
