import { sendLeadEmail } from "@/lib/email/sendLeadEmail";
import { contactSchema } from "@/lib/schemas/contact.schema";
import type { ContactPayload } from "@/types/contact";
import type { ContactFormFieldErrors } from "@/types/contactForm";

type SubmitContactLeadSuccess = {
  success: true;
  payload: ContactPayload;
};

type SubmitContactLeadFailure = {
  success: false;
  status: 400 | 500;
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

export async function submitContactLead(input: unknown): Promise<SubmitContactLeadResult> {
  const normalizedInput = normalizeInput(input);
  const parsed = contactSchema.safeParse(normalizedInput);

  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      fieldErrors: toFieldErrors(parsed.error.flatten().fieldErrors),
      formError: null,
    };
  }

  const payload: ContactPayload = {
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    service: parsed.data.service,
  };

  try {
    await sendLeadEmail(payload);
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
