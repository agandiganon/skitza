export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  sourcePage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface ContactSubmissionContext {
  ipAddress?: string | null;
  userAgent?: string | null;
  submittedVia?: 'form_action' | 'api_contact';
}
