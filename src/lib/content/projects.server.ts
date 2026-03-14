import fs from 'node:fs';
import path from 'node:path';
import type { ProjectItem } from './projects';
import { PROJECT_BLUR_DATA_URL } from '@/lib/media/placeholders';

const PICTURES_DIR = path.join(process.cwd(), 'public', 'pictures');
const FILE_PATTERN = /^(\d+)(fav)?\.(webp|png|jpg|jpeg)$/i;
const SOURCE_EXTENSION_PRIORITY = ['png', 'jpg', 'jpeg', 'webp'] as const;

type SupportedExtension = (typeof SOURCE_EXTENSION_PRIORITY)[number];

type ProjectRecord = {
  id: number;
  featuredHome: boolean;
  basename: string;
  extension: SupportedExtension;
  assetVersion: string;
};

const PROJECT_ALT_TEXTS: Partial<Record<number, string>> = {
  1: 'הדמיית אריזת קרטון ממותגת למוצר טיפוח',
  2: 'אריזת קרטון מעוצבת לעסק קוסמטיקה',
  3: 'מארז קרטון ממותג למוצר מדף',
  4: 'הדמיית אריזת קרטון לעסק מזון ומדף',
  5: 'אריזת קרטון ממותגת למוצר קמעונאי',
  6: 'קופסת קרטון מודפסת לעסק ישראלי',
  7: 'הדמיית קופסת קרטון למוצר טיפוח',
  8: 'מארז קרטון ממותג להשקת מוצר',
  9: 'אריזת קרטון מעוצבת לעסק מסחרי',
  10: 'הדמיית אריזת קרטון למוצר חדש',
  11: 'קופסת קרטון ממותגת לעסק קוסמטיקה',
  12: 'מארז קרטון מודפס למוצר מדף',
  13: 'אריזת קרטון יוקרתית במיתוג מלא',
  14: 'אריזת קרטון קשיחה במיתוג עסקי',
  15: 'קופסת קרטון מעוצבת למוצר שיווקי',
  16: 'הדמיית אריזת קרטון למותג קמעונאי',
  17: 'פתרון אריזת קרטון ממותגת לחנות',
  18: 'מארז קרטון מודפס לעסק מקומי',
  19: 'מארז קרטון מודפס לעסק קמעונאי',
  20: 'אריזת קרטון מעוצבת לתצוגת מוצר',
  21: 'קופסת קרטון ממותגת לעסק מסחרי',
  22: 'הדמיית אריזת קרטון מודפסת למוצר חדש',
  23: 'קופסת קרטון ממותגת לאריזת מוצר',
  24: 'פתרון אריזת קרטון ממותגת לעסק',
  25: 'מארז קרטון ייעודי למוצר מדף',
  26: 'הדמיית אריזה שיווקית מקרטון לעסק',
  27: 'אריזת קרטון ממותגת לתצוגת מוצר',
  28: 'קופסת קרטון מודפסת לעסק ישראלי',
  29: 'הדמיית מארז קרטון למוצר פרימיום',
  30: 'פתרון אריזת קרטון לעסק קוסמטיקה',
  31: 'מארז קרטון מודפס להשקת מוצר',
  32: 'קופסת קרטון ממותגת למותג ישראלי',
  33: 'הדמיית מארז קרטון ממותג למדף',
  34: 'אריזת קרטון יוקרתית במיתוג מלא',
  35: 'הדמיית אריזת קרטון למוצר קמעונאי',
  36: 'מארז קרטון ממותג להשקת מוצר',
  37: 'פתרון אריזת קרטון מודפסת לעסק',
  38: 'קופסת קרטון מעוצבת למוצר מדף',
  39: 'מארז קרטון ממותג לעסק מסחרי',
  40: 'הדמיית אריזת קרטון שיווקית לעסק',
};

function getExtensionPriority(extension: SupportedExtension): number {
  return SOURCE_EXTENSION_PRIORITY.indexOf(extension);
}

function buildAssetVersion(filePath: string) {
  const sourceStats = fs.statSync(filePath);
  return `${Math.trunc(sourceStats.mtimeMs)}-${sourceStats.size}`;
}

function buildAssetUrl(basePath: string, assetVersion: string) {
  return `${basePath}?v=${assetVersion}`;
}

export function getProjects() {
  const entries = fs.readdirSync(PICTURES_DIR, { withFileTypes: true });
  const records = new Map<number, ProjectRecord>();

  for (const entry of entries) {
    if (!entry.isFile() || entry.name === '.DS_Store') {
      continue;
    }

    const match = entry.name.match(FILE_PATTERN);
    if (!match) {
      continue;
    }

    const id = Number(match[1]);
    const featuredHome = Boolean(match[2]);
    const extension = match[3].toLowerCase() as SupportedExtension;
    const basename = path.basename(entry.name, path.extname(entry.name));
    const assetVersion = buildAssetVersion(path.join(PICTURES_DIR, entry.name));
    const existing = records.get(id);

    if (!existing) {
      records.set(id, { id, featuredHome, basename, extension, assetVersion });
      continue;
    }

    const shouldPreferFeatured = featuredHome && !existing.featuredHome;
    const shouldPreferExtension =
      getExtensionPriority(extension) <
      getExtensionPriority(existing.extension);
    const shouldReplace = shouldPreferFeatured || shouldPreferExtension;

    records.set(id, {
      id,
      featuredHome: existing.featuredHome || featuredHome,
      basename: shouldReplace ? basename : existing.basename,
      extension: shouldReplace ? extension : existing.extension,
      assetVersion: shouldReplace ? assetVersion : existing.assetVersion,
    });
  }

  const allProjects: ProjectItem[] = Array.from(records.values())
    .sort((left, right) => left.id - right.id)
    .map((project) => ({
      id: project.id,
      featuredHome: project.featuredHome,
      imageAlt:
        PROJECT_ALT_TEXTS[project.id] ??
        'הדמיית אריזת קרטון ממותגת לעסק מתוך גלריית סקיצה אריזות',
      originalSrc: buildAssetUrl(
        `/pictures/${project.basename}.${project.extension}`,
        project.assetVersion,
      ),
      heroSrc: buildAssetUrl(
        `/pictures-derived/hero/${project.basename}.webp`,
        project.assetVersion,
      ),
      cardSrc: buildAssetUrl(
        `/pictures-derived/card/${project.basename}.webp`,
        project.assetVersion,
      ),
      thumbSrc: buildAssetUrl(
        `/pictures-derived/thumb/${project.basename}.webp`,
        project.assetVersion,
      ),
      lightboxSrc: buildAssetUrl(
        `/pictures-derived/lightbox/${project.basename}.webp`,
        project.assetVersion,
      ),
      blurDataUrl: PROJECT_BLUR_DATA_URL,
      assetVersion: project.assetVersion,
    }));

  const featuredProjects = allProjects.filter(
    (project) => project.featuredHome,
  );

  return {
    allProjects,
    featuredProjects,
  };
}
