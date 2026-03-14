'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { submitContactFormAction } from '@/actions/contact';
import { pushToDataLayer } from '@/lib/analytics/datalayer';
import {
  CONTACT_SERVICE_OPTIONS,
  PHONE_TEL,
  WHATSAPP_CONTACT_URL,
} from '@/lib/constants';
import { CONTACT_FORM_INITIAL_STATE } from '@/types/contactForm';
import type {
  ContactFormFieldErrors,
  ContactFormState,
} from '@/types/contactForm';

const SERVICE_OPTIONS = [...CONTACT_SERVICE_OPTIONS];
const NAME_MAX_LENGTH = 120;
const PHONE_MAX_LENGTH = 25;
const EMAIL_MAX_LENGTH = 254;

function isLikelyEmail(value: string) {
  const trimmed = value.trim();
  const parts = trimmed.split('@');

  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domainPart] = parts;
  return Boolean(
    localPart && domainPart && domainPart.includes('.') && !/\s/.test(trimmed),
  );
}

const inputClass = {
  dark: 'w-full appearance-none rounded-lg border border-primary-foreground/20 bg-white/10 px-4 py-3 text-base text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary-foreground/30',
  light:
    'w-full appearance-none rounded-xl border border-blue-100/85 bg-white/96 px-4 py-3 text-base text-foreground shadow-[0_10px_24px_-22px_rgba(15,23,42,0.18)] placeholder:text-foreground/46 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30',
};

const errorClass = {
  dark: 'mt-1 text-sm text-amber-300',
  light: 'mt-1 text-sm text-red-600',
};

const feedbackClass = {
  dark: {
    success: 'text-center text-sm text-green-300',
    error: 'text-center text-sm text-amber-300',
  },
  light: {
    success: 'text-center text-sm text-green-700',
    error: 'text-center text-sm text-red-700',
  },
};

function hasFieldErrors(fieldErrors: ContactFormFieldErrors) {
  return Object.values(fieldErrors).some(Boolean);
}

type ContactFormProps = {
  variant?: 'dark' | 'light';
  defaultService?: string;
};

function getInitialTrackingMeta() {
  if (typeof window === 'undefined') {
    return {
      sourcePage: '',
      referrer: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
    };
  }

  const currentUrl = new URL(window.location.href);

  return {
    sourcePage: `${currentUrl.pathname}${currentUrl.search}`,
    referrer: document.referrer || '',
    utmSource: currentUrl.searchParams.get('utm_source') ?? '',
    utmMedium: currentUrl.searchParams.get('utm_medium') ?? '',
    utmCampaign: currentUrl.searchParams.get('utm_campaign') ?? '',
  };
}

export function ContactForm({
  variant = 'dark',
  defaultService,
}: ContactFormProps) {
  const inputCn = inputClass[variant];
  const errCn = errorClass[variant];
  const feedbackCn = feedbackClass[variant];
  const [state, formAction, isPending] = useActionState(
    submitContactFormAction,
    CONTACT_FORM_INITIAL_STATE,
  );
  const [clientFieldErrors, setClientFieldErrors] =
    useState<ContactFormFieldErrors>({});
  const [trackingMeta] = useState(getInitialTrackingMeta);
  const formRef = useRef<HTMLFormElement>(null);
  const handledSuccessRef = useRef<ContactFormState | null>(null);

  useEffect(() => {
    if (state.status !== 'success' || handledSuccessRef.current === state) {
      return;
    }

    handledSuccessRef.current = state;
    formRef.current?.reset();
    pushToDataLayer('form_submit_success', {
      form_name: 'contact',
      service_type: state.submittedService ?? undefined,
      page_path: trackingMeta.sourcePage || undefined,
    });
  }, [state, trackingMeta.sourcePage]);

  useEffect(() => {
    if (
      state.status !== 'error' ||
      hasFieldErrors(clientFieldErrors) ||
      !state.formError
    ) {
      return;
    }

    pushToDataLayer('form_submit_error', {
      form_name: 'contact',
      error_type: 'server',
      page_path: trackingMeta.sourcePage || undefined,
    });
  }, [
    clientFieldErrors,
    state.formError,
    state.status,
    trackingMeta.sourcePage,
  ]);

  function validate(formData: FormData): ContactFormFieldErrors {
    const errors: ContactFormFieldErrors = {};
    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();

    if (!name) errors.name = 'נא להזין שם מלא';
    else if (name.length > NAME_MAX_LENGTH) errors.name = 'השם ארוך מדי';
    if (!phone) errors.phone = 'נא להזין מספר נייד';
    else if (!/^[\d\s\-]+$/.test(phone)) errors.phone = 'נא להזין מספר תקין';
    else if (phone.length > PHONE_MAX_LENGTH)
      errors.phone = 'נא להזין מספר תקין';
    if (!email) errors.email = 'נא להזין דוא"ל';
    else if (!isLikelyEmail(email)) errors.email = 'נא להזין דוא"ל תקין';
    else if (email.length > EMAIL_MAX_LENGTH)
      errors.email = 'נא להזין דוא"ל תקין';
    if (!service) errors.service = 'נא לבחור סוג פנייה';

    return errors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const errors = validate(formData);

    setClientFieldErrors(errors);

    if (hasFieldErrors(errors)) {
      event.preventDefault();
      pushToDataLayer('form_submit_error', {
        form_name: 'contact',
        error_type: 'client_validation',
        service_type: String(formData.get('service') ?? '').trim() || undefined,
        page_path: trackingMeta.sourcePage || undefined,
      });
      return;
    }

    pushToDataLayer('form_submit', {
      form_name: 'contact',
      service_type: String(formData.get('service') ?? '').trim() || undefined,
      page_path: trackingMeta.sourcePage || undefined,
    });
  }

  function handleServiceChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value.trim();
    setClientFieldErrors((current) => ({ ...current, service: undefined }));

    if (!value) {
      return;
    }

    pushToDataLayer('contact_service_select', {
      form_name: 'contact',
      service_type: value,
      page_path: trackingMeta.sourcePage || undefined,
    });
  }

  const activeFieldErrors =
    state.status === 'success'
      ? {}
      : hasFieldErrors(clientFieldErrors)
        ? clientFieldErrors
        : state.fieldErrors;
  const showSuccess = !isPending && state.status === 'success';
  const showFormError =
    !isPending && state.status === 'error' && Boolean(state.formError);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
    >
      <input
        type="hidden"
        name="website"
        value=""
        readOnly
        tabIndex={-1}
        autoComplete="off"
      />
      <input
        type="hidden"
        name="sourcePage"
        value={trackingMeta.sourcePage}
        readOnly
      />
      <input
        type="hidden"
        name="referrer"
        value={trackingMeta.referrer}
        readOnly
      />
      <input
        type="hidden"
        name="utmSource"
        value={trackingMeta.utmSource}
        readOnly
      />
      <input
        type="hidden"
        name="utmMedium"
        value={trackingMeta.utmMedium}
        readOnly
      />
      <input
        type="hidden"
        name="utmCampaign"
        value={trackingMeta.utmCampaign}
        readOnly
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1 block text-sm font-medium"
          >
            שם מלא
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={NAME_MAX_LENGTH}
            required
            aria-invalid={!!activeFieldErrors.name}
            aria-describedby={
              activeFieldErrors.name ? 'contact-name-error' : undefined
            }
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
          <label
            htmlFor="contact-phone"
            className="mb-1 block text-sm font-medium"
          >
            טלפון
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={PHONE_MAX_LENGTH}
            required
            aria-invalid={!!activeFieldErrors.phone}
            aria-describedby={
              activeFieldErrors.phone ? 'contact-phone-error' : undefined
            }
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
          <label
            htmlFor="contact-email"
            className="mb-1 block text-sm font-medium"
          >
            דוא&quot;ל
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={EMAIL_MAX_LENGTH}
            required
            aria-invalid={!!activeFieldErrors.email}
            aria-describedby={
              activeFieldErrors.email ? 'contact-email-error' : undefined
            }
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
          <label
            htmlFor="contact-service"
            className="mb-1 block text-sm font-medium"
          >
            סוג פנייה
          </label>
          <select
            id="contact-service"
            name="service"
            required
            defaultValue={defaultService ?? ''}
            onChange={handleServiceChange}
            aria-invalid={!!activeFieldErrors.service}
            aria-describedby={
              activeFieldErrors.service ? 'contact-service-error' : undefined
            }
            className={inputCn}
          >
            <option value="">בחר סוג פנייה</option>
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
      </div>
      <button
        id="cta-contact-submit"
        data-testid="submit-lead"
        data-track-placement="contact_form"
        type="submit"
        disabled={isPending}
        className="from-accent-cyan to-primary focus:ring-offset-primary min-h-[44px] w-full rounded-xl bg-gradient-to-l via-blue-500 px-6 py-3 font-medium text-white shadow-lg transition hover:opacity-95 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none active:scale-[0.99] active:opacity-100 disabled:opacity-70"
      >
        {isPending ? 'שולח...' : 'שלח פנייה'}
      </button>
      {showSuccess && (
        <div
          id="contact-form-success"
          className={`rounded-[1.45rem] border px-4 py-4 text-start shadow-sm ${
            variant === 'dark'
              ? 'border-emerald-400/30 bg-emerald-400/10 text-white'
              : 'border-emerald-200 bg-emerald-50 text-emerald-950'
          }`}
          role="status"
        >
          <p className="text-base font-black">הפנייה התקבלה בהצלחה</p>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              variant === 'dark' ? 'text-white/82' : 'text-emerald-900/80'
            }`}
          >
            {state.successMessage}
          </p>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              variant === 'dark' ? 'text-white/72' : 'text-emerald-900/72'
            }`}
          >
            אם נוח לכם להמשיך מיד, אפשר גם להתקשר או לשלוח הודעה בוואטסאפ.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              data-testid="contact-success-phone"
              href={`tel:${PHONE_TEL}`}
              data-track-event="click_to_call"
              data-track-placement="contact_form_success"
              data-track-label="contact_form_success_phone"
              className={`inline-flex min-h-[40px] items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${
                variant === 'dark'
                  ? 'bg-white/14 text-white hover:bg-white/20 active:scale-[0.98] active:bg-white/24'
                  : 'bg-white text-emerald-800 shadow-sm hover:bg-emerald-100 active:scale-[0.98] active:bg-emerald-200'
              }`}
            >
              התקשרו
            </a>
            <a
              data-testid="contact-success-whatsapp"
              href={WHATSAPP_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="whatsapp_click"
              data-track-placement="contact_form_success"
              data-track-label="contact_form_success_whatsapp"
              className={`inline-flex min-h-[40px] items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${
                variant === 'dark'
                  ? 'bg-white/10 text-white hover:bg-white/18 active:scale-[0.98] active:bg-white/22'
                  : 'bg-white text-emerald-800 shadow-sm hover:bg-emerald-100 active:scale-[0.98] active:bg-emerald-200'
              }`}
            >
              וואטסאפ
            </a>
          </div>
        </div>
      )}
      {showFormError && (
        <p className={feedbackCn.error} role="alert">
          {state.formError}
        </p>
      )}
    </form>
  );
}
