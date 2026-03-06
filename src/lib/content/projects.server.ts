import fs from "node:fs";
import path from "node:path";
import type { ProjectItem } from "./projects";

const PICTURES_DIR = path.join(process.cwd(), "public", "pictures");
const FILE_PATTERN = /^(\d+)(fav)?\.(webp|png|jpg|jpeg)$/i;
const EXTENSION_PRIORITY = ["webp", "png", "jpg", "jpeg"] as const;

type SupportedExtension = (typeof EXTENSION_PRIORITY)[number];

type ProjectRecord = {
  id: number;
  featuredHome: boolean;
  basename: string;
  extension: SupportedExtension;
};

function getExtensionPriority(extension: SupportedExtension): number {
  return EXTENSION_PRIORITY.indexOf(extension);
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
    const existing = records.get(id);

    if (!existing) {
      records.set(id, { id, featuredHome, basename, extension });
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
    });
  }

  const allProjects: ProjectItem[] = Array.from(records.values())
    .sort((left, right) => left.id - right.id)
    .map((project) => ({
      id: project.id,
      imageSrc: `/pictures/${project.basename}.${project.extension}`,
      imageAlt: `פרויקט אריזה מספר ${project.id}`,
      featuredHome: project.featuredHome,
    }));

  const featuredProjects = allProjects.filter((project) => project.featuredHome);

  return {
    allProjects,
    featuredProjects,
  };
}
