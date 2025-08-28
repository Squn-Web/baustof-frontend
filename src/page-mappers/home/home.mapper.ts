import { HomeSections } from "./home.enum";
import HeroSection from "../../components/home/HeroSection.astro";
import AboutSection from "../../components/home/AboutSection.astro";
import OffersSection from "../../components/home/OffersSection.astro";
import ProjectsSection from "../../components/home/ProjectsSection.astro";
import ContactSection from "../../components/home/ContactSection.astro";

export const homeSections: Record<string, any> = {
  [HomeSections.HERO_SECTION]: HeroSection,
  [HomeSections.ABOUT_SECTION]: AboutSection,
  [HomeSections.OFFERS_SECTION]: OffersSection,
  [HomeSections.PROJECTS_SECTION]: ProjectsSection,
  [HomeSections.CONTACT_SECTION]: ContactSection,
};

export function mapHomeSectionToComponent(homeSection: string) {
  const componentToDisplay = homeSections[homeSection];

  return componentToDisplay;
}
