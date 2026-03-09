import { sendLeadEmail } from "@/lib/email/sendLeadEmail";
import { enforceContactRateLimit } from "@/lib/contact/contactRateLimit";
import { contactSchema } from "@/lib/schemas/contact.schema";
import type { ContactPayload, ContactSubmissionContext } from "@/types/contact";
import type { ContactFormFieldErrors } from "@/types/contactForm";

type SubmitContactLeadSuccess = {
  success: true;
  payload: ContactPayload;
};

type SubmitContactLeadFailure = {
  success: false;
  status: 400 | 429 | 500;
  fieldErrors: ContactFormFieldErrors;
  formError: string | null;
};

export type SubmitContactLeadResult = SubmitContactLeadSuccess | SubmitContactLeadFailure;

function normalizeInput(input: unknown): Record<string, unknown> {
  if (input instanceof FormData) {
    return {
      name: input.get("name"),
      phone: input.get("phone"),
      email: input.get("email"),
      service: input.get("service"),
      sourcePage: input.get("sourcePage"),
      referrer: input.get("referrer"),
      utmSource: input.get("utmSource"),
      utmMedium: input.get("utmMedium"),
      utmCampaign: input.get("utmCampaign"),
      website: input.get("website"),
    };
  }

  if (input && typeof input === "object") {
    return input as Record<string, unknown>;
  }

  return {};
}

function pickFirstError(fieldErrors: Record<string, string[] | undefined>, field: keyof ContactPayload) {
  return fieldErrors[field]?.[0];
}

function toFieldErrors(fieldErrors: Record<string, string[] | undefined>): ContactFormFieldErrors {
  return {
    name: pickFirstError(fieldErrors, "name"),
    phone: pickFirstError(fieldErrors, "phone"),
    email: pickFirstError(fieldErrors, "email"),
    service: pickFirstError(fieldErrors, "service"),
  };
}

function coerceOptionalValue(input: unknown) {
  const value = typeof input === "string" ? input.trim() : "";
  return value || undefined;
}

function buildPayload(data: Record<string, unknown>): ContactPayload {
  return {
    name: String(data.name ?? "").trim(),
    phone: String(data.phone ?? "").trim(),
    email: String(data.email ?? "").trim(),
    service: String(data.service ?? "").trim(),
    sourcePage: coerceOptionalValue(data.sourcePage),
    referrer: coerceOptionalValue(data.referrer),
    utmSource: coerceOptionalValue(data.utmSource),
    utmMedium: coerceOptionalValue(data.utmMedium),
    utmCampaign: coerceOptionalValue(data.utmCampaign),
  };
}

export async function submitContactLead(
  input: unknown,
  context: ContactSubmissionContext = {}
): Promise<SubmitContactLeadResult> {
  const normalizedInput = normalizeInput(input);
  const honeypotValue = String(normalizedInput.website ?? "").trim();

  if (honeypotValue) {
    return {
      success: true,
      payload: {
        name: "spam-blocked",
        phone: "",
        email: "",
        service: "other",
      },
    };
  }

  const parsed = contactSchema.safeParse(normalizedInput);

  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      fieldErrors: toFieldErrors(parsed.error.flatten().fieldErrors),
      formError: null,
    };
  }

  const payload = buildPayload(parsed.data);
  const rateLimitResult = enforceContactRateLimit({
    ipAddress: context.ipAddress,
    email: payload.email,
    phone: payload.phone,
  });

  if (!rateLimitResult.allowed) {
    return {
      success: false,
      status: 429,
      fieldErrors: {},
      formError: "בוצעו יותר מדי פניות בפרק זמן קצר. נסו שוב בעוד כמה דקות.",
    };
  }

  try {
    await sendLeadEmail(payload, context);
    return {
      success: true,
      payload,
    };
  } catch (error) {
    console.error("[contact] failed to submit lead", error);
    return {
      success: false,
      status: 500,
      fieldErrors: {},
      formError: "אירעה שגיאה בשליחה. נא לנסות שוב בעוד רגע או להתקשר אלינו.",
    };
  }
}
