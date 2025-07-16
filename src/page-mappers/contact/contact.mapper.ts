import { ContactSections } from "./contact.enum";
import HeroSection from "../../components/contact/HeroSection.astro";

export const aboutSections: Record<string, any> = {
  [ContactSections.HERO_SECTION]: HeroSection,
};

export function mapContactSectionToComponent(aboutSection: string) {
  const componentToDisplay = aboutSections[aboutSection];

  return componentToDisplay;
}
