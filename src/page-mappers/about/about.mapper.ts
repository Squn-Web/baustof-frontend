import { AboutSections } from "./about.enum";
import HeroSection from "../../components/about/HeroSection.astro";
import MissionSection from "../../components/about/MissionSection.astro";
import ValuesSection from "../../components/about/ValuesSection.astro";
import HistorySection from "../../components/about/HistorySection.astro";

export const aboutSections: Record<string, any> = {
  [AboutSections.HERO_SECTION]: HeroSection,
  [AboutSections.MISSION_SECTION]: MissionSection,
  [AboutSections.VALUES_SECTION]: ValuesSection,
  [AboutSections.HISTORY_SECTION]: HistorySection,
};

export function mapAboutSectionToComponent(aboutSection: string) {
  const componentToDisplay = aboutSections[aboutSection];

  return componentToDisplay;
}
