"use server";

import { submitContactLead } from "@/lib/contact/submitContactLead";
import type { ContactFormState } from "@/types/contactForm";

export async function submitContactFormAction(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const result = await submitContactLead(formData);

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
    successMessage: "הפנייה נשלחה בהצלחה. נחזור אליך בהקדם.",
    submittedService: result.payload.service,
  };
}
