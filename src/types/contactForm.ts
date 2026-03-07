import type { ContactPayload } from "@/types/contact";

export type ContactFormFieldErrors = Partial<Record<keyof ContactPayload, string>>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors: ContactFormFieldErrors;
  formError: string | null;
  successMessage: string | null;
  submittedService: string | null;
};

export const CONTACT_FORM_INITIAL_STATE: ContactFormState = {
  status: "idle",
  fieldErrors: {},
  formError: null,
  successMessage: null,
  submittedService: null,
};
