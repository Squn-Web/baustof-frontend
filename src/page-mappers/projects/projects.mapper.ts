import { ProjectsSections } from "./projects.enum";
import HeroSection from "../../components/projects/HeroSection.astro";
import ProjectsSection from "../../components/projects/ProjectsSection.astro";

export const projectsSections: Record<string, any> = {
  [ProjectsSections.HERO_SECTION]: HeroSection,
  [ProjectsSections.PROJECTS_SECTION]: ProjectsSection,
};

export function mapProjectsSectionToComponent(projectsSection: string) {
  const componentToDisplay = projectsSections[projectsSection];

  return componentToDisplay;
}
