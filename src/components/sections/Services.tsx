import { Printer, Box, Palette, MessageCircle } from 'lucide-react';
import { ServiceCard } from '@/components/ui/ServiceCard';

const services = [
  {
    title: 'הפקות דפוס ואריזות',
    description:
      'הפקת מוצרי דפוס לעסקים בכל היקף: אריזות, קרטונים, חומרי פרסום ומוצרים ממותגים בהתאמה אישית, עם טכנולוגיית הדפסה מתקדמת וגימור מוקפד.',
    icon: Printer,
    href: '/services/print',
  },
  {
    title: 'הדמיות 3D',
    description:
      'הדמיה חיה לפי קובץ הלקוח לפני ייצור, לבדיקת מבנה, התאמות ודיוק תכנוני. השירות מאפשר לקבל החלטות מהר יותר ולחסוך תיקונים בשלב ההפקה.',
    icon: Box,
    href: '/services/3d',
  },
  {
    title: 'תכנון ועיצוב מוצרי פרסום',
    description:
      'תכנון, קונספט ועיצוב של מוצרי פרסום ומיתוג לעסקים, כולל התאמת חומרים, שפה גרפית ומסרים שיווקיים שמחזקים את נוכחות המותג.',
    icon: Palette,
    href: '/services/promotional-design',
  },
  {
    title: 'תכנון אריזה למוצר קיים/חדש',
    description:
      'אפיון ותכנון פתרון אריזה מותאם למוצר חדש או קיים, כולל בחירת חומר גלם, תכנון מבני וחשיבה על תדמית, שינוע ועלויות.',
    icon: MessageCircle,
    href: '/services/consultancy',
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="home-services-heading"
      className="cv-auto bg-white px-4 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-center text-sm font-black tracking-[0.24em] text-blue-700/75 uppercase">
          מה מקבלים אצלנו
        </p>
        <h2
          id="home-services-heading"
          className="text-primary mb-5 text-center text-4xl font-black tracking-tight sm:text-5xl lg:text-[3.35rem]"
        >
          שירותי סקיצה
        </h2>
        <p className="text-foreground/75 mx-auto mb-12 max-w-3xl text-center text-[1rem] leading-relaxed sm:mb-14 sm:text-[1.06rem]">
          מעטפת מלאה לעסק, משלב הרעיון ועד ייצור בפועל. כל שירות נבנה כך שיהיה
          אפשר להתחיל מהר, להבין מה מקבלים ולהתקדם לתוצאה מסודרת.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {services.map((item) => (
            <ServiceCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
