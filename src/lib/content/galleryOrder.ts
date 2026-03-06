import type { ProjectItem } from "@/lib/content/projects";

export const FIXED_GALLERY_ORDER = [
  31, 11, 2, 38, 12, 39, 5, 15, 29, 35,
  18, 7, 34, 16, 37, 4, 8, 27, 23, 21,
  13, 20, 3, 25, 6, 30, 19, 40, 14, 17,
  22, 26, 36, 32, 24, 28, 9, 10, 1, 33,
] as const;

export function orderProjectsForGallery(projects: readonly ProjectItem[]): ProjectItem[] {
  const projectsById = new Map(projects.map((project) => [project.id, project]));
  const orderedProjects = FIXED_GALLERY_ORDER
    .map((id) => projectsById.get(id))
    .filter((project): project is ProjectItem => Boolean(project));

  const orderedIds = new Set(orderedProjects.map((project) => project.id));
  const leftovers = projects
    .filter((project) => !orderedIds.has(project.id))
    .sort((left, right) => left.id - right.id);

  return [...orderedProjects, ...leftovers];
}
