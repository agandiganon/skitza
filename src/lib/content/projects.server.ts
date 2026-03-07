import fs from "node:fs";
import path from "node:path";
import type { ProjectItem } from "./projects";

const PICTURES_DIR = path.join(process.cwd(), "public", "pictures");
const FILE_PATTERN = /^(\d+)(fav)?\.(webp|png|jpg|jpeg)$/i;
const SOURCE_EXTENSION_PRIORITY = ["png", "jpg", "jpeg", "webp"] as const;

type SupportedExtension = (typeof SOURCE_EXTENSION_PRIORITY)[number];

type ProjectRecord = {
  id: number;
  featuredHome: boolean;
  basename: string;
  extension: SupportedExtension;
  assetVersion: string;
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
    if (!entry.isFile() || entry.name === ".DS_Store") {
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
      getExtensionPriority(extension) < getExtensionPriority(existing.extension);
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
      imageAlt: `פרויקט אריזה מספר ${project.id}`,
      originalSrc: buildAssetUrl(`/pictures/${project.basename}.${project.extension}`, project.assetVersion),
      heroSrc: buildAssetUrl(`/pictures-derived/hero/${project.basename}.webp`, project.assetVersion),
      cardSrc: buildAssetUrl(`/pictures-derived/card/${project.basename}.webp`, project.assetVersion),
      thumbSrc: buildAssetUrl(`/pictures-derived/thumb/${project.basename}.webp`, project.assetVersion),
      assetVersion: project.assetVersion,
    }));

  const featuredProjects = allProjects.filter((project) => project.featuredHome);

  return {
    allProjects,
    featuredProjects,
  };
}
