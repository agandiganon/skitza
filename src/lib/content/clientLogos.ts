import fs from "node:fs";
import path from "node:path";

export type ClientLogo = {
  id: string;
  name: string;
  src: string;
  alt: string;
};

const LOGOS_DIR = path.join(process.cwd(), "public", "company-logos");
const ALLOWED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]);

const NAME_OVERRIDES: Record<string, string> = {
  "golda.png": "גולדה",
  "seaofspa.png": "Sea of Spa",
  "mifal-hapais.png": "מפעל הפיס",
  "kin.png": "כינרת זמורה דביר",
  "habad.gif": "חב\"ד",
  "someone-cares.png": "מישהו שאכפת לו",
  "company-256.png": "מותג שותף",
  "clinique.svg": "Clinique",
  "logo-small.png": "לוגו שותף",
  "logo-transparent.png": "לוגו שותף",
};

const GENERIC_NAME_PATTERNS = [/^logo/i, /^company/i, /^image/i, /^img/i, /^\d+$/];

const DEFAULT_LOGO_FILES = [
  "golda.png",
  "seaofspa.png",
  "mifal-hapais.png",
  "kin.png",
  "habad.gif",
  "someone-cares.png",
  "company-256.png",
] as const;

function toDisplayName(filename: string): string {
  const lower = filename.toLowerCase();
  if (NAME_OVERRIDES[lower]) {
    return NAME_OVERRIDES[lower];
  }

  const basename = lower.replace(/\.[a-z0-9]+$/i, "");
  if (GENERIC_NAME_PATTERNS.some((pattern) => pattern.test(basename))) {
    return "לקוח שותף";
  }

  const normalized = basename.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!normalized) {
    return "לקוח שותף";
  }

  return normalized
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function readLogoFiles(): string[] {
  try {
    const files = fs.readdirSync(LOGOS_DIR, { withFileTypes: true });
    return files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => ALLOWED_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "he"));
  } catch {
    return [...DEFAULT_LOGO_FILES];
  }
}

const logoFiles = readLogoFiles();

export const CLIENT_LOGOS: readonly ClientLogo[] = logoFiles.map((filename, index) => {
  const id = filename
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const name = toDisplayName(filename);

  return {
    id: id || `logo-${index + 1}`,
    name,
    src: `/company-logos/${filename}`,
    alt: `לוגו ${name}`,
  };
});
