import type { BreadcrumbItem } from "@/components/navigation/Breadcrumbs";
import type { FaqItem } from "@/types/faq";

const FALLBACK_SITE_URL = "https://skitza-pack.co.il";

function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL;

  try {
    return new URL(rawUrl);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

export function getAbsoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

export function buildLocalBusinessSchema({
  name,
  image,
  telephone,
  address,
  description,
}: {
  name: string;
  image: string;
  telephone: string;
  address: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    image: getAbsoluteUrl(image),
    url: getAbsoluteUrl("/"),
    telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "חולון",
      addressCountry: "IL",
    },
    areaServed: "ישראל",
    description,
  };
}

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: getAbsoluteUrl(item.href ?? "/"),
    })),
  };
}

export function buildFaqSchema(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    areaServed: "ישראל",
    url: getAbsoluteUrl(path),
    provider: {
      "@type": "LocalBusiness",
      name: "סקיצה אריזות",
      url: getAbsoluteUrl("/"),
    },
  };
}

export function buildContactPageSchema({
  description,
}: {
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "צור קשר - סקיצה אריזות",
    description,
    url: getAbsoluteUrl("/contact"),
    mainEntity: {
      "@type": "LocalBusiness",
      name: "סקיצה אריזות",
      url: getAbsoluteUrl("/"),
    },
  };
}
