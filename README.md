# Skitza Workspace

Production-ready workspace for **Skitza Packaging**.

## Architecture

- `frontend/` - Next.js 16 (App Router), Tailwind + custom CSS, hosted on Vercel.
- `backend/` - Express + TypeScript lead API (`POST /api/contact`), hosted on Render/Railway.
- Email delivery is via **Resend**.
- No newsletter flow and no database persistence.

## Folder Structure

```text
.
├─ frontend/
│  ├─ src/
│  ├─ public/
│  ├─ next.config.ts
│  └─ package.json
├─ backend/
│  ├─ src/
│  │  ├─ config/
│  │  ├─ routes/
│  │  ├─ schemas/
│  │  ├─ services/
│  │  └─ middlewares/
│  └─ package.json
├─ scripts/
│  └─ smoke-check.sh
└─ package.json
```

## Requirements

- Node.js 20+
- npm 10+

## Install

```bash
npm install
cp .env.example .env
```

## Environment Variables

### Frontend (`frontend/.env.example`)

- `NEXT_PUBLIC_SITE_URL=https://skitza-pack.co.il`
- `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`
- `NEXT_PUBLIC_BACKEND_ORIGIN=https://<render-or-railway-domain>`

### Backend (`backend/.env.example`)

- `PORT=4000`
- `NODE_ENV=production`
- `CORS_ORIGIN=https://skitza-pack.co.il,https://www.skitza-pack.co.il,http://localhost:3000,http://localhost:3001`
- `RATE_LIMIT_WINDOW_MS=60000`
- `RATE_LIMIT_MAX=40`
- `RESEND_API_KEY=...`
- `RESEND_FROM_EMAIL=leads@yourdomain.com`
- `RESEND_TO_EMAIL=adi181800030@gmail.com`

## Local Development

```bash
npm run dev
```

- Frontend: `http://localhost:3000` (or 3001 if 3000 busy)
- Backend: `http://localhost:4000`

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
npm run smoke
```

## API Contract

### `POST /api/contact`

Request JSON:

```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "service": "string"
}
```

Responses:

- `200 { "success": true }`
- `400 { "error": "..." }`
- `500 { "error": "שגיאת שרת" }`

## Tracking Hooks (GTM / Google Ads)

The following stable selectors exist:

- Top call button: `#cta-call-top` + `data-track="click_to_call"`
- Desktop WhatsApp float: `#cta-whatsapp-float` + `data-track="whatsapp_click"`
- Mobile WhatsApp button: `#cta-whatsapp-mobile` + `data-track="whatsapp_click"`
- Contact form submit: `#cta-contact-submit` + `data-track="form_submit"`
- Contact success state: `#contact-form-success` + `data-track="form_submit_success"`

Data layer events sent:

- `click_to_call`
- `whatsapp_click`
- `form_submit`
- `form_submit_success`

## Deployment

### Frontend (Vercel)

1. Set project root to `frontend`.
2. Configure frontend env vars in Vercel.
3. Deploy.

### Backend (Render/Railway)

1. Deploy `backend` service.
2. Configure backend env vars (including Resend and CORS allowlist).
3. Copy backend URL into frontend `NEXT_PUBLIC_BACKEND_ORIGIN`.

### DNS/Security (Cloudflare)

- Manage DNS in Cloudflare for `skitza-pack.co.il`.
- Keep Cloudflare SSL + WAF enabled.
- App-level security headers are configured in `frontend/next.config.ts` and `helmet` is enabled in backend.
# skitza
