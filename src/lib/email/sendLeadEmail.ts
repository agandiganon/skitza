import type { ContactPayload, ContactSubmissionContext } from '@/types/contact';
import { WHATSAPP_CONTACT_URL } from '@/lib/constants';
import { getResendClient } from './resend';

function sanitizeText(value: string): string {
  return value.replace(/[\r\n<>]/g, ' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat('he-IL', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Jerusalem',
  }).format(date);
}

function buildMetaRow(label: string, value: string | undefined) {
  if (!value) {
    return '';
  }

  return `
    <tr>
      <td style="width:140px;font-weight:700;color:#32517f;">${escapeHtml(label)}</td>
      <td style="background:#f7faff;border:1px solid #e1ebff;border-radius:10px;padding:10px 12px;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function buildLeadEmailHtml(
  payload: ContactPayload,
  submittedAt: string,
  context: ContactSubmissionContext,
): string {
  const name = escapeHtml(payload.name);
  const phone = escapeHtml(payload.phone);
  const email = escapeHtml(payload.email);
  const service = escapeHtml(payload.service);
  const timestamp = escapeHtml(submittedAt);
  const telHref = `tel:${payload.phone.replace(/[^\d+]/g, '')}`;
  const mailHref = `mailto:${payload.email}`;
  const whatsappHref = WHATSAPP_CONTACT_URL;

  const metaRows = [
    buildMetaRow('עמוד מקור', payload.sourcePage),
    buildMetaRow('רפרר', payload.referrer),
    buildMetaRow('UTM Source', payload.utmSource),
    buildMetaRow('UTM Medium', payload.utmMedium),
    buildMetaRow('UTM Campaign', payload.utmCampaign),
    buildMetaRow('IP', context.ipAddress ?? undefined),
    buildMetaRow('User Agent', context.userAgent ?? undefined),
    buildMetaRow('נשלח דרך', context.submittedVia ?? undefined),
  ]
    .filter(Boolean)
    .join('');

  return `
  <!doctype html>
  <html lang="he-IL" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>פנייה חדשה מהאתר</title>
    </head>
    <body style="margin:0;padding:0;background:#f3f7ff;font-family:Arial,'Heebo',sans-serif;color:#0f2240;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:24px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background:#ffffff;border:1px solid #d6e4ff;border-radius:16px;overflow:hidden;">
              <tr>
                <td style="background:linear-gradient(90deg,#0d2f66,#1f6de8);padding:20px 24px;color:#ffffff;">
                  <div style="font-size:13px;opacity:0.88;">סקיצה אריזות</div>
                  <div style="font-size:26px;font-weight:800;line-height:1.25;margin-top:6px;">פנייה חדשה מהאתר</div>
                  <div style="margin-top:10px;font-size:13px;line-height:1.6;color:rgba(255,255,255,0.86);">
                    <span style="display:inline-block;margin-left:12px;">סוג פנייה: ${service}</span>
                    <span style="display:inline-block;">זמן שליחה: ${timestamp}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 24px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0 10px;">
                    <tr>
                      <td style="width:140px;font-weight:700;color:#32517f;">שם מלא</td>
                      <td style="background:#f7faff;border:1px solid #e1ebff;border-radius:12px;padding:12px 14px;">${name}</td>
                    </tr>
                    <tr>
                      <td style="width:140px;font-weight:700;color:#32517f;">טלפון</td>
                      <td style="background:#f7faff;border:1px solid #e1ebff;border-radius:12px;padding:12px 14px;">${phone}</td>
                    </tr>
                    <tr>
                      <td style="width:140px;font-weight:700;color:#32517f;">דוא"ל</td>
                      <td style="background:#f7faff;border:1px solid #e1ebff;border-radius:12px;padding:12px 14px;">${email}</td>
                    </tr>
                    <tr>
                      <td style="width:140px;font-weight:700;color:#32517f;">סוג פנייה</td>
                      <td style="background:#f7faff;border:1px solid #e1ebff;border-radius:12px;padding:12px 14px;">${service}</td>
                    </tr>
                  </table>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                    <tr>
                      <td style="font-size:13px;color:#5d759d;padding-bottom:10px;">דרכי יצירת קשר</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="${telHref}" style="display:inline-block;background:#0f4ec9;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:700;margin-left:8px;">חיוג ללקוח</a>
                        <a href="${whatsappHref}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:700;margin-left:8px;">וואטסאפ</a>
                        <a href="${mailHref}" style="display:inline-block;background:#eef4ff;color:#0f4ec9;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:700;border:1px solid #cfe0ff;">שליחת מייל</a>
                      </td>
                    </tr>
                  </table>

                  ${
                    metaRows
                      ? `
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;border-top:1px solid #e7efff;padding-top:16px;border-collapse:separate;border-spacing:0 10px;">
                    <tr>
                      <td style="font-size:13px;color:#5d759d;padding-bottom:4px;">פרטי מקור ומדידה</td>
                    </tr>
                    ${metaRows}
                  </table>`
                      : ''
                  }
                </td>
              </tr>
              <tr>
                <td style="border-top:1px solid #e7efff;padding:14px 24px;font-size:12px;color:#607aa4;">
                  מקור: website-contact-form
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

function shouldUseLocalEmailFallback() {
  return process.env.VERCEL !== '1';
}

export async function sendLeadEmail(
  payload: ContactPayload,
  context: ContactSubmissionContext = {},
): Promise<void> {
  const allowLocalFallback = shouldUseLocalEmailFallback();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const recipient =
    process.env.RESEND_TO_EMAIL?.trim() || 'adi181800030@gmail.com';

  if (!from) {
    if (allowLocalFallback) {
      console.warn(
        '[contact] skipping email delivery locally because RESEND_FROM_EMAIL is missing',
      );
      return;
    }

    throw new Error('RESEND_FROM_EMAIL is not configured');
  }

  const safePayload: ContactPayload = {
    name: sanitizeText(payload.name),
    phone: sanitizeText(payload.phone),
    email: sanitizeText(payload.email).toLowerCase(),
    service: sanitizeText(payload.service),
    sourcePage: sanitizeText(payload.sourcePage ?? '') || undefined,
    referrer: sanitizeText(payload.referrer ?? '') || undefined,
    utmSource: sanitizeText(payload.utmSource ?? '') || undefined,
    utmMedium: sanitizeText(payload.utmMedium ?? '') || undefined,
    utmCampaign: sanitizeText(payload.utmCampaign ?? '') || undefined,
  };

  const submittedAtDate = new Date();
  const submittedAt = formatSubmittedAt(submittedAtDate);
  const html = buildLeadEmailHtml(safePayload, submittedAt, context);
  let resend;

  try {
    resend = getResendClient();
  } catch (error) {
    if (allowLocalFallback) {
      console.warn(
        '[contact] skipping email delivery locally because Resend is not configured',
        error,
      );
      return;
    }

    throw error;
  }

  const { error } = await resend.emails.send({
    from,
    to: [recipient],
    subject: `פנייה חדשה מהאתר - ${safePayload.service} - ${safePayload.name}`,
    replyTo: safePayload.email,
    text: [
      'ליד חדש התקבל מאתר סקיצה אריזות',
      '',
      `שם: ${safePayload.name}`,
      `טלפון: ${safePayload.phone}`,
      `דוא\"ל: ${safePayload.email}`,
      `סוג פנייה: ${safePayload.service}`,
      safePayload.sourcePage ? `עמוד מקור: ${safePayload.sourcePage}` : null,
      safePayload.referrer ? `רפרר: ${safePayload.referrer}` : null,
      safePayload.utmSource ? `UTM Source: ${safePayload.utmSource}` : null,
      safePayload.utmMedium ? `UTM Medium: ${safePayload.utmMedium}` : null,
      safePayload.utmCampaign
        ? `UTM Campaign: ${safePayload.utmCampaign}`
        : null,
      context.ipAddress ? `IP: ${context.ipAddress}` : null,
      context.userAgent ? `User Agent: ${context.userAgent}` : null,
      context.submittedVia ? `נשלח דרך: ${context.submittedVia}` : null,
      `מקור: website-contact-form`,
      `זמן: ${submittedAt}`,
    ]
      .filter(Boolean)
      .join('\n'),
    html,
  });

  if (error) {
    if (allowLocalFallback) {
      console.warn(
        '[contact] simulated successful local delivery after Resend error',
        error,
      );
      return;
    }

    throw new Error(error.message || 'Failed sending email via Resend');
  }
}
