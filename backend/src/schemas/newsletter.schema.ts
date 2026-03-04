import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().email('נא להזין דוא"ל תקין'),
});

export type NewsletterPayload = z.infer<typeof newsletterSchema>;
