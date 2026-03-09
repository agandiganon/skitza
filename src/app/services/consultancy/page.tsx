import { JsonLd } from '@/components/seo/JsonLd';
import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { SERVICE_PAGE_DEFINITIONS } from '@/lib/content/servicePages';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from '@/lib/seo/schema';

const page = SERVICE_PAGE_DEFINITIONS.consultancy;

export const metadata = page.metadata;

export default function ConsultancyPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { label: 'דף הבית', href: '/' },
            { label: 'שירותים', href: '/#services' },
            { label: page.label, href: page.href },
          ]),
          buildServiceSchema({
            name: page.label,
            description: page.heroLead,
            path: page.href,
          }),
          buildFaqSchema(page.faq),
        ]}
      />
      <ServicePageLayout page={page} />
    </>
  );
}
