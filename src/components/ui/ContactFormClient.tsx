"use client";

import dynamic from "next/dynamic";

type ContactFormProps = {
  variant?: "dark" | "light";
};

const ContactFormNoSsr = dynamic(
  () => import("./ContactForm").then((module) => module.ContactForm),
  {
    ssr: false,
    loading: () => <div className="min-h-[420px] w-full animate-pulse rounded-xl bg-white/10" aria-hidden />,
  }
);

export function ContactFormClient({ variant = "dark" }: ContactFormProps) {
  return <ContactFormNoSsr variant={variant} />;
}
