import { ContactSections } from "./contact.enum";
import HeroSection from "../../components/contact/HeroSection.astro";
import DetailsSection from "../../components/contact/DetailsSection.astro";
import MapSection from "../../components/contact/MapSection.astro";
import CarrerSection from "../../components/contact/CarrerSection.astro";
import CollaborationSection from "../../components/contact/CollaborationSection.astro";

export const aboutSections: Record<string, any> = {
  [ContactSections.HERO_SECTION]: HeroSection,
  [ContactSections.DETAILS_SECTION]: DetailsSection,
  [ContactSections.MAP_SECTION]: MapSection,
  [ContactSections.COLLABORATION_SECTION]: CollaborationSection,
  [ContactSections.CARRER_SECTION]: CarrerSection,
};

export function mapContactSectionToComponent(aboutSection: string) {
  const componentToDisplay = aboutSections[aboutSection];

  return componentToDisplay;
}
