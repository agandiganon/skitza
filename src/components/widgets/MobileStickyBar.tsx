'use client';

import { PHONE_TEL, WHATSAPP_CONTACT_URL } from '@/lib/constants';

export function MobileStickyBar() {
  return (
    <div className="mobile-sticky-bar fixed inset-x-0 bottom-0 z-[55] flex gap-2.5 border-t border-slate-200/85 bg-white/92 px-3 pt-2.5 pb-[calc(env(safe-area-inset-bottom)+0.55rem)] shadow-[0_-14px_32px_-24px_rgba(15,23,42,0.34)] backdrop-blur-xl sm:hidden">
      <a
        id="cta-call-mobile"
        data-testid="mobile-call"
        data-track-event="click_to_call"
        data-track-placement="mobile_sticky_bar"
        data-track-label="mobile_call"
        href={`tel:${PHONE_TEL}`}
        className="bg-primary text-primary-foreground flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold shadow-[0_14px_30px_-22px_rgba(30,58,95,0.5)] transition active:scale-[0.99] active:opacity-95"
        aria-label="התקשר עכשיו"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        התקשר
      </a>
      <a
        id="cta-whatsapp-mobile"
        data-testid="mobile-whatsapp"
        data-track-event="whatsapp_click"
        data-track-placement="mobile_sticky_bar"
        data-track-label="mobile_whatsapp"
        href={WHATSAPP_CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 font-semibold text-white shadow-[0_14px_28px_-22px_rgba(37,211,102,0.56)] transition active:scale-[0.99] active:opacity-95"
        aria-label="שלח הודעה בוואטסאפ"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        וואטסאפ
      </a>
    </div>
  );
}
