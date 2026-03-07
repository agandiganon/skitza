"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import { submitContactFormAction } from "@/app/actions/contact";
import { pushToDataLayer } from "@/lib/analytics/datalayer";
import { CONTACT_SERVICE_OPTIONS } from "@/lib/constants";
import { CONTACT_FORM_INITIAL_STATE } from "@/types/contactForm";
import type { ContactFormFieldErrors, ContactFormState } from "@/types/contactForm";

const SERVICE_OPTIONS = [...CONTACT_SERVICE_OPTIONS];

const inputClass = {
  dark:
    "w-full rounded-lg border border-primary-foreground/20 bg-white/10 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary-foreground/30",
  light:
    "w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30",
};

const errorClass = {
  dark: "mt-1 text-sm text-amber-300",
  light: "mt-1 text-sm text-red-600",
};

const feedbackClass = {
  dark: {
    success: "text-center text-sm text-green-300",
    error: "text-center text-sm text-amber-300",
  },
  light: {
    success: "text-center text-sm text-green-700",
    error: "text-center text-sm text-red-700",
  },
};

function hasFieldErrors(fieldErrors: ContactFormFieldErrors) {
  return Object.values(fieldErrors).some(Boolean);
}

type ContactFormProps = {
  variant?: "dark" | "light";
  defaultService?: string;
};

export function ContactForm({ variant = "dark", defaultService }: ContactFormProps) {
  const inputCn = inputClass[variant];
  const errCn = errorClass[variant];
  const feedbackCn = feedbackClass[variant];
  const [state, formAction, isPending] = useActionState(
    submitContactFormAction,
    CONTACT_FORM_INITIAL_STATE
  );
  const [clientFieldErrors, setClientFieldErrors] = useState<ContactFormFieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const handledSuccessRef = useRef<ContactFormState | null>(null);

  useEffect(() => {
    if (state.status !== "success" || handledSuccessRef.current === state) {
      return;
    }

    handledSuccessRef.current = state;
    formRef.current?.reset();
    pushToDataLayer("form_submit_success", {
      form_name: "contact",
      service_type: state.submittedService ?? undefined,
    });
  }, [state]);

  function validate(formData: FormData): ContactFormFieldErrors {
    const errors: ContactFormFieldErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();

    if (!name) errors.name = "נא להזין שם מלא";
    if (!phone) errors.phone = "נא להזין מספר נייד";
    else if (!/^[\d\s\-]+$/.test(phone)) errors.phone = "נא להזין מספר תקין";
    if (!email) errors.email = "נא להזין דוא\"ל";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "נא להזין דוא\"ל תקין";
    if (!service) errors.service = "נא לבחור סוג שירות";

    return errors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const errors = validate(formData);

    setClientFieldErrors(errors);

    if (hasFieldErrors(errors)) {
      event.preventDefault();
      return;
    }

    pushToDataLayer("form_submit", { form_name: "contact" });
  }

  const activeFieldErrors = hasFieldErrors(clientFieldErrors) ? clientFieldErrors : state.fieldErrors;
  const showSuccess = !isPending && state.status === "success";
  const showFormError = !isPending && state.status === "error" && Boolean(state.formError);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-4"
      data-track="form-submit"
    >
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
          שם מלא
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={!!activeFieldErrors.name}
          aria-describedby={activeFieldErrors.name ? "contact-name-error" : undefined}
          className={inputCn}
          placeholder="שם מלא"
        />
        {activeFieldErrors.name && (
          <p id="contact-name-error" className={errCn} role="alert">
            {activeFieldErrors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium">
          נייד
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          aria-invalid={!!activeFieldErrors.phone}
          aria-describedby={activeFieldErrors.phone ? "contact-phone-error" : undefined}
          className={inputCn}
          placeholder="054-0000000"
        />
        {activeFieldErrors.phone && (
          <p id="contact-phone-error" className={errCn} role="alert">
            {activeFieldErrors.phone}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
          דוא&quot;ל
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!activeFieldErrors.email}
          aria-describedby={activeFieldErrors.email ? "contact-email-error" : undefined}
          className={inputCn}
          placeholder="example@email.com"
        />
        {activeFieldErrors.email && (
          <p id="contact-email-error" className={errCn} role="alert">
            {activeFieldErrors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-service" className="mb-1 block text-sm font-medium">
          סוג שירות
        </label>
        <select
          id="contact-service"
          name="service"
          required
          defaultValue={defaultService ?? ""}
          aria-invalid={!!activeFieldErrors.service}
          aria-describedby={activeFieldErrors.service ? "contact-service-error" : undefined}
          className={inputCn}
        >
          <option value="">בחר סוג שירות</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {activeFieldErrors.service && (
          <p id="contact-service-error" className={errCn} role="alert">
            {activeFieldErrors.service}
          </p>
        )}
      </div>
      <button
        id="cta-contact-submit"
        data-track="form-submit"
        type="submit"
        disabled={isPending}
        className="w-full min-h-[44px] rounded-xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary px-6 py-3 font-medium text-white shadow-lg transition hover:opacity-95 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
      >
        {isPending ? "שולח..." : "שלח פנייה"}
      </button>
      {showSuccess && (
        <p
          id="contact-form-success"
          data-track="form-submit-success"
          className={feedbackCn.success}
          role="status"
        >
          {state.successMessage}
        </p>
      )}
      {showFormError && (
        <p className={feedbackCn.error} role="alert">
          {state.formError}
        </p>
      )}
    </form>
  );
}
