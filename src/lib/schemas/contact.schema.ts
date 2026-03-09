import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "נא להזין שם מלא"),
  phone: z
    .string()
    .trim()
    .min(1, "נא להזין מספר נייד")
    .regex(/^[\d\s\-]+$/, "נא להזין מספר תקין"),
  email: z.string().trim().email('נא להזין דוא"ל תקין'),
  service: z.string().trim().min(1, "נא לבחור סוג פנייה"),
  sourcePage: z.string().trim().max(240).optional().or(z.literal("")),
  referrer: z.string().trim().max(500).optional().or(z.literal("")),
  utmSource: z.string().trim().max(120).optional().or(z.literal("")),
  utmMedium: z.string().trim().max(120).optional().or(z.literal("")),
  utmCampaign: z.string().trim().max(180).optional().or(z.literal("")),
});

export type ContactSchemaInput = z.infer<typeof contactSchema>;
