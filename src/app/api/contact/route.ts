import { NextResponse } from 'next/server';
import { submitContactLead } from '@/lib/contact/submitContactLead';
import type { ContactFormFieldErrors } from '@/types/contactForm';

const MAX_CONTENT_LENGTH = 20_000;
const API_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow',
};

export const runtime = 'nodejs';

function firstFieldError(fieldErrors: ContactFormFieldErrors): string | null {
  return Object.values(fieldErrors).find(Boolean) ?? null;
}

function getFirstHeaderValue(headerValue: string | null) {
  return headerValue?.split(',')[0]?.trim() || null;
}

function getAllowedOrigins() {
  return new Set(
    [
      process.env.NEXT_PUBLIC_SITE_URL?.trim(),
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.trim(),
    ].filter(Boolean),
  );
}

export async function POST(request: Request) {
  try {
    const allowedOrigins = getAllowedOrigins();
    const origin = request.headers.get('origin');

    if (origin && allowedOrigins.size > 0 && !allowedOrigins.has(origin)) {
      return NextResponse.json(
        { error: 'Origin not allowed' },
        { status: 403, headers: API_HEADERS },
      );
    }

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json(
        { error: 'תוכן הבקשה לא תקין' },
        { status: 415, headers: API_HEADERS },
      );
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_CONTENT_LENGTH) {
      return NextResponse.json(
        { error: 'הבקשה גדולה מדי' },
        { status: 413, headers: API_HEADERS },
      );
    }

    if (!rawBody.trim()) {
      return NextResponse.json(
        { error: 'נתוני הבקשה לא תקינים' },
        { status: 400, headers: API_HEADERS },
      );
    }

    let raw: unknown;
    try {
      raw = JSON.parse(rawBody) as unknown;
    } catch {
      return NextResponse.json(
        { error: 'פורמט JSON לא תקין' },
        { status: 400, headers: API_HEADERS },
      );
    }

    if (!raw || typeof raw !== 'object') {
      return NextResponse.json(
        { error: 'נתוני הבקשה לא תקינים' },
        { status: 400, headers: API_HEADERS },
      );
    }

    const result = await submitContactLead(raw, {
      ipAddress:
        getFirstHeaderValue(request.headers.get('x-forwarded-for')) ||
        getFirstHeaderValue(request.headers.get('cf-connecting-ip')) ||
        getFirstHeaderValue(request.headers.get('x-real-ip')),
      userAgent: request.headers.get('user-agent'),
      submittedVia: 'api_contact',
    });
    if (!result.success) {
      return NextResponse.json(
        {
          error:
            result.formError ||
            firstFieldError(result.fieldErrors) ||
            'שגיאה בנתונים',
        },
        { status: result.status, headers: API_HEADERS },
      );
    }

    return NextResponse.json({ success: true }, { headers: API_HEADERS });
  } catch (error) {
    console.error('[api/contact] unexpected error', error);
    return NextResponse.json(
      { error: 'שגיאת שרת' },
      { status: 500, headers: API_HEADERS },
    );
  }
}
