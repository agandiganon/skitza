import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function getValidGtmId(rawValue: string | null) {
  const gtmId = rawValue?.trim();

  if (!gtmId) return null;
  if (!/^GTM-[A-Z0-9]+$/i.test(gtmId)) return null;
  if (/^GTM-X+$/i.test(gtmId)) return null;

  return gtmId;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const gtmId = getValidGtmId(url.searchParams.get('id'));

  if (!gtmId) {
    return new NextResponse('', {
      status: 204,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }

  const body = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
