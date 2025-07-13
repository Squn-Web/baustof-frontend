import { HomeSections } from "./home.enum";
import HeroSection from "../../components/home/HeroSection.astro";
import PraiseSection from "../../components/home/PraiseSection.astro";
import AboutSection from "../../components/home/AboutSection.astro";
import OffersSection from "../../components/home/OffersSection.astro";
import ProjectsSection from "../../components/home/ProjectsSection.astro";
import ContactSection from "../../components/home/ContactSection.astro";

export const homeSections: Record<HomeSections, any> = {
  [HomeSections.HERO_SECTION]: HeroSection,
  [HomeSections.PRAISE_SECTION]: PraiseSection,
  [HomeSections.ABOUT_SECTION]: AboutSection,
  [HomeSections.OFFERS_SECTION]: OffersSection,
  [HomeSections.PROJECTS_SECTION]: ProjectsSection,
  [HomeSections.CONTACT_SECTION]: ContactSection,
};

export function mapHomeSectionToComponent(homeSection: HomeSections) {
  const componentToDisplay = homeSections[homeSection];

  return componentToDisplay;
}
