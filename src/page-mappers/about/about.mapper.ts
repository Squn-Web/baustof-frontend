import { AboutSections } from "./about.enum";
import HeroSection from "../../components/about/HeroSection.astro";
// import PraiseSection from "../../components/home/PraiseSection.astro";
// import AboutSection from "../../components/home/AboutSection.astro";
// import OffersSection from "../../components/home/OffersSection.astro";
// import ProjectsSection from "../../components/home/ProjectsSection.astro";
// import ContactSection from "../../components/home/ContactSection.astro";

export const aboutSections: Record<string, any> = {
  [AboutSections.HERO_SECTION]: HeroSection,
  // [HomeSections.PRAISE_SECTION]: PraiseSection,
  // [HomeSections.ABOUT_SECTION]: AboutSection,
  // [HomeSections.OFFERS_SECTION]: OffersSection,
  // [HomeSections.PROJECTS_SECTION]: ProjectsSection,
  // [HomeSections.CONTACT_SECTION]: ContactSection,
};

export function mapAboutSectionToComponent(aboutSection: string) {
  const componentToDisplay = aboutSections[aboutSection];

  return componentToDisplay;
}
