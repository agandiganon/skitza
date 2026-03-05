export type ProjectCategory = "branding" | "innovation" | "packaging";

export type ProjectItem = {
  id: number;
  title: string;
  category: ProjectCategory;
  imageSrc: string;
  imageAlt: string;
  featuredHome?: boolean;
};

export const PROJECTS: readonly ProjectItem[] = [
  {
    id: 1,
    title: "מארז קרטון ממותג",
    category: "packaging",
    imageSrc: "/pictures/1.png",
    imageAlt: "מארז קרטון ממותג לעסק",
  },
  {
    id: 2,
    title: "אריזת קרטון למוצר פרימיום",
    category: "branding",
    imageSrc: "/pictures/2.png",
    imageAlt: "אריזת קרטון למוצר פרימיום",
    featuredHome: true,
  },
  {
    id: 3,
    title: "קופסת מוצר מעוצבת",
    category: "innovation",
    imageSrc: "/pictures/3.png",
    imageAlt: "קופסת מוצר מעוצבת בהתאמה אישית",
  },
  {
    id: 4,
    title: "אריזת מדף ממותגת",
    category: "packaging",
    imageSrc: "/pictures/4.png",
    imageAlt: "אריזת מדף ממותגת",
  },
  {
    id: 5,
    title: "מארז דפוס יוקרתי",
    category: "branding",
    imageSrc: "/pictures/5.png",
    imageAlt: "מארז דפוס יוקרתי ממותג",
    featuredHome: true,
  },
  {
    id: 6,
    title: "קופסת קרטון לקמפיין",
    category: "innovation",
    imageSrc: "/pictures/6.png",
    imageAlt: "קופסת קרטון לקמפיין שיווקי",
  },
  {
    id: 7,
    title: "דגם אריזה לעסק",
    category: "packaging",
    imageSrc: "/pictures/7.png",
    imageAlt: "דגם אריזה לעסק",
  },
  {
    id: 8,
    title: "מארז חלון מודפס",
    category: "branding",
    imageSrc: "/pictures/8.png",
    imageAlt: "מארז חלון מודפס למוצר",
    featuredHome: true,
  },
  {
    id: 9,
    title: "קופסה לעמדת מכירה",
    category: "innovation",
    imageSrc: "/pictures/9.png",
    imageAlt: "קופסה לעמדת מכירה",
  },
  {
    id: 10,
    title: "שקית קרטון ממותגת",
    category: "packaging",
    imageSrc: "/pictures/10.png",
    imageAlt: "שקית קרטון ממותגת",
  },
  {
    id: 11,
    title: "מארז מתנה מודפס",
    category: "branding",
    imageSrc: "/pictures/11.png",
    imageAlt: "מארז מתנה מודפס",
  },
  {
    id: 12,
    title: "אריזת קונספט חדשה",
    category: "innovation",
    imageSrc: "/pictures/12.png",
    imageAlt: "אריזת קונספט חדשה",
    featuredHome: true,
  },
  {
    id: 13,
    title: "פתרון אריזה לקמעונאות",
    category: "packaging",
    imageSrc: "/pictures/13.png",
    imageAlt: "פתרון אריזה לקמעונאות",
  },
  {
    id: 14,
    title: "קופסה ממותגת לסדרה",
    category: "branding",
    imageSrc: "/pictures/14.png",
    imageAlt: "קופסה ממותגת לסדרה מסחרית",
  },
  {
    id: 15,
    title: "מארז תצוגה ממותג",
    category: "packaging",
    imageSrc: "/pictures/15.png",
    imageAlt: "מארז תצוגה ממותג",
  },
  {
    id: 16,
    title: "פתרון אריזה ייחודי",
    category: "innovation",
    imageSrc: "/pictures/16.png",
    imageAlt: "פתרון אריזה ייחודי",
    featuredHome: true,
  },
  {
    id: 17,
    title: "קופסת מוצר מרובעת",
    category: "branding",
    imageSrc: "/pictures/17.png",
    imageAlt: "קופסת מוצר מרובעת",
  },
  {
    id: 18,
    title: "אריזה לקו פרימיום",
    category: "packaging",
    imageSrc: "/pictures/18.png",
    imageAlt: "אריזה לקו פרימיום",
  },
  {
    id: 19,
    title: "מארז מוצרים משולב",
    category: "branding",
    imageSrc: "/pictures/19.png",
    imageAlt: "מארז מוצרים משולב",
  },
  {
    id: 20,
    title: "עיצוב אריזה בהתאמה",
    category: "innovation",
    imageSrc: "/pictures/20.png",
    imageAlt: "עיצוב אריזה בהתאמה",
  },
  {
    id: 21,
    title: "אריזה ממותגת למבצע",
    category: "branding",
    imageSrc: "/pictures/21.png",
    imageAlt: "אריזה ממותגת למבצע",
    featuredHome: true,
  },
  {
    id: 22,
    title: "קונספט אריזה למותג",
    category: "innovation",
    imageSrc: "/pictures/22.png",
    imageAlt: "קונספט אריזה למותג",
  },
];

const explicitFeaturedProjects = PROJECTS.filter((project) => project.featuredHome);

export const HOME_FEATURED_PROJECTS = (
  explicitFeaturedProjects.length >= 12 ? explicitFeaturedProjects : PROJECTS
).slice(0, 12);
