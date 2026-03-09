import { domainToASCII } from 'node:url';
import { z } from 'zod';

function normalizeEmail(value: string) {
  const trimmed = value.trim();
  const [localPart, domainPart] = trimmed.split('@');

  if (!localPart || !domainPart) {
    return trimmed;
  }

  const asciiDomain = domainToASCII(domainPart);
  return asciiDomain ? `${localPart}@${asciiDomain}` : trimmed;
}

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'נא להזין שם מלא').max(120, 'השם ארוך מדי'),
  phone: z
    .string()
    .trim()
    .min(1, 'נא להזין מספר נייד')
    .max(25, 'נא להזין מספר תקין')
    .regex(/^[\d\s\-]+$/, 'נא להזין מספר תקין'),
  email: z
    .string()
    .trim()
    .max(254, 'נא להזין דוא"ל תקין')
    .transform(normalizeEmail)
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      'נא להזין דוא"ל תקין',
    ),
  service: z
    .string()
    .trim()
    .min(1, 'נא לבחור סוג פנייה')
    .max(80, 'סוג הפנייה ארוך מדי'),
  sourcePage: z.string().trim().max(240).optional().or(z.literal('')),
  referrer: z.string().trim().max(500).optional().or(z.literal('')),
  utmSource: z.string().trim().max(120).optional().or(z.literal('')),
  utmMedium: z.string().trim().max(120).optional().or(z.literal('')),
  utmCampaign: z.string().trim().max(180).optional().or(z.literal('')),
});

export type ContactSchemaInput = z.infer<typeof contactSchema>;
