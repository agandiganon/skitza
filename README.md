# Skitza Website

Production-ready Next.js website for **Skitza Packaging**.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Resend (email delivery from `POST /api/contact`)

## Repository Structure

```text
.
├── src/                        # App code (pages, components, libs)
├── public/                     # Static assets
├── archive/
│   └── backend-legacy/         # Archived old backend (not used in runtime)
├── scripts/
│   └── smoke-check.sh          # Smoke test script
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── package.json
├── package-lock.json
├── .env.example
└── README.md
```

## Scripts

```bash
npm run dev        # run local dev server
npm run build      # production build
npm run start      # run production server
npm run lint       # eslint
npm run typecheck  # TypeScript check
npm run smoke      # smoke tests (headers + routes + desktop/mobile)
npm run clean      # remove build/test artifacts
```

## Environment Variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GTM_ID` (optional)
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

## Contact API

The site uses a single Next.js route handler:

- `POST /api/contact`

Payload:

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

## Deployment (Vercel + Cloudflare)

### Vercel

- Framework: Next.js
- Root directory: `.`
- Build command: `npm run build`
- Output: default Next.js

### Cloudflare

- Manage DNS for your domain in Cloudflare.
- Point domain/subdomain to Vercel target (CNAME/A as instructed by Vercel).
- Keep SSL mode Full/Strict and standard caching/WAF enabled.

## Notes

- `archive/backend-legacy` is kept for reference only and is not part of runtime.
- Main branch should include only the active frontend app at root.
