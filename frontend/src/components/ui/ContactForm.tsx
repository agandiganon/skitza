"use client";

import { useState } from "react";

import { CONTACT_SERVICE_OPTIONS } from "@/lib/constants";
import { pushToDataLayer } from "@/lib/analytics/datalayer";
import type { ApiErrorResponse } from "@/types/api";
import type { ContactPayload } from "@/types/contact";

const SERVICE_OPTIONS = [...CONTACT_SERVICE_OPTIONS];
const CONFIGURED_BACKEND_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.trim();
const LOCAL_FALLBACK_API_URL = "/api/contact";

function getContactApiUrl(): string {
  const backendOrigin = CONFIGURED_BACKEND_ORIGIN;
  if (backendOrigin) {
    return `${backendOrigin.replace(/\/+$/, "")}/api/contact`;
  }
  return LOCAL_FALLBACK_API_URL;
}

const CONTACT_API_URL = getContactApiUrl();

async function postContactRequest(payload: ContactPayload, url: string) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "omit",
    body: JSON.stringify(payload),
  });
}

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

export function ContactForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const inputCn = inputClass[variant];
  const errCn = errorClass[variant];
  const feedbackCn = feedbackClass[variant];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const clearErrors = () => setErrors({});

  function validate(formData: FormData): Record<string, string> {
    const err: Record<string, string> = {};
    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const service = formData.get("service") as string;

    if (!name) err.name = "נא להזין שם מלא";
    if (!phone) err.phone = "נא להזין מספר נייד";
    else if (!/^[\d\s\-]+$/.test(phone)) err.phone = "נא להזין מספר תקין";
    if (!email) err.email = "נא להזין דוא\"ל";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = "נא להזין דוא\"ל תקין";
    if (!service) err.service = "נא לבחור סוג שירות";

    return err;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const err = validate(formData);
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    clearErrors();

    setStatus("sending");
    pushToDataLayer("form_submit", { form_name: "contact" });

    try {
      const payload: ContactPayload = {
        name: String(formData.get("name") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        service: String(formData.get("service") ?? "").trim(),
      };

      let res: Response;
      try {
        res = await postContactRequest(payload, CONTACT_API_URL);
      } catch {
        if (CONTACT_API_URL === LOCAL_FALLBACK_API_URL) {
          throw new Error("CONTACT_REQUEST_FAILED");
        }
        res = await postContactRequest(payload, LOCAL_FALLBACK_API_URL);
      }

      const data = (await res.json().catch(() => null)) as ApiErrorResponse | null;
      if (!res.ok) {
        const fallback =
          res.status === 429 ? "יש עומס זמני. נא לנסות שוב בעוד רגע." : "שגיאת שרת";
        setErrors({ form: data?.error || fallback });
        setStatus("error");
        return;
      }

      pushToDataLayer("form_submit_success", {
        form_name: "contact",
        service_type: payload.service,
      });

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrors({ form: "אירעה שגיאה בשליחה. נא לנסות שוב בעוד רגע או להתקשר אלינו." });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-track="form-submit"
      suppressHydrationWarning
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
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={inputCn}
          placeholder="שם מלא"
        />
        {errors.name && (
          <p id="contact-name-error" className={errCn} role="alert">
            {errors.name}
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
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          className={inputCn}
          placeholder="054-0000000"
        />
        {errors.phone && (
          <p id="contact-phone-error" className={errCn} role="alert">
            {errors.phone}
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
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputCn}
          placeholder="example@email.com"
        />
        {errors.email && (
          <p id="contact-email-error" className={errCn} role="alert">
            {errors.email}
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
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "contact-service-error" : undefined}
          className={inputCn}
        >
          <option value="">בחר סוג שירות</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="contact-service-error" className={errCn} role="alert">
            {errors.service}
          </p>
        )}
      </div>
      <button
        id="cta-contact-submit"
        data-track="form-submit"
        type="submit"
        disabled={status === "sending"}
        className="w-full min-h-[44px] rounded-xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary px-6 py-3 font-medium text-white shadow-lg transition hover:opacity-95 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
      >
        {status === "sending" ? "שולח..." : "שלח פנייה"}
      </button>
      {status === "success" && (
        <p
          id="contact-form-success"
          data-track="form-submit-success"
          className={feedbackCn.success}
          role="status"
        >
          הפנייה נשלחה בהצלחה. נחזור אליך בהקדם.
        </p>
      )}
      {status === "error" && (
        <p className={feedbackCn.error} role="alert">
          {errors.form || "אירעה שגיאה. נא לנסות שוב או ליצור קשר בטלפון."}
        </p>
      )}
    </form>
  );
}
