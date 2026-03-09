"use server";

import { headers } from "next/headers";
import { submitContactLead } from "@/lib/contact/submitContactLead";
import type { ContactFormState } from "@/types/contactForm";

function getFirstHeaderValue(headerValue: string | null) {
  return headerValue?.split(",")[0]?.trim() || null;
}

export async function submitContactFormAction(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const requestHeaders = await headers();
  const result = await submitContactLead(formData, {
    ipAddress:
      getFirstHeaderValue(requestHeaders.get("x-forwarded-for")) ||
      getFirstHeaderValue(requestHeaders.get("cf-connecting-ip")) ||
      getFirstHeaderValue(requestHeaders.get("x-real-ip")),
    userAgent: requestHeaders.get("user-agent"),
    submittedVia: "form_action",
  });

  if (!result.success) {
    return {
      status: "error",
      fieldErrors: result.fieldErrors,
      formError: result.formError,
      successMessage: null,
      submittedService: null,
    };
  }

  return {
    status: "success",
    fieldErrors: {},
    formError: null,
    successMessage: "הפנייה נשלחה בהצלחה. נחזור אליכם להמשך תיאום.",
    submittedService: result.payload.service,
  };
}
