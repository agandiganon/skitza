import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, rgba(237,245,255,1) 0%, rgba(248,251,255,1) 34%, rgba(219,234,254,1) 100%)',
        fontFamily: 'sans-serif',
        direction: 'rtl',
        color: '#0f2240',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 18% 22%, rgba(6,182,212,0.16), transparent 28%), radial-gradient(circle at 82% 18%, rgba(37,99,235,0.16), transparent 24%), radial-gradient(circle at 50% 88%, rgba(59,130,246,0.12), transparent 22%)',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          padding: '60px 72px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            padding: '12px 20px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.76)',
            border: '1px solid rgba(148,163,184,0.28)',
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          סקיצה אריזות
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            maxWidth: 850,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 78, fontWeight: 900, lineHeight: 1.02 }}>
              בית דפוס
            </div>
            <div style={{ fontSize: 78, fontWeight: 900, lineHeight: 1.02 }}>
              לאריזות קרטון
            </div>
            <div style={{ fontSize: 78, fontWeight: 900, lineHeight: 1.02 }}>
              ממותגות לעסקים
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              fontWeight: 600,
              lineHeight: 1.4,
              color: '#35557a',
            }}
          >
            תכנון, עיצוב, הדמיה והפקה לעסקים שצריכים פתרון מסודר במקום אחד.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {[
            'תכנון ועיצוב מוצר',
            'הצעת מחיר למוצר קיים',
            'הצעת מחיר למוצר חדש',
          ].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.86)',
                border: '1px solid rgba(59,130,246,0.16)',
                fontSize: 24,
                fontWeight: 700,
                color: '#1447a6',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>,
    size,
  );
}
