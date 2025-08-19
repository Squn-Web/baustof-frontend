import { OfferSections } from "./offer.enum";
import HeroSection from "../../components/offer/HeroSection.astro";
import ContactSection from "../../components/offer/ContactSection.astro";
import OffersSection from "../../components/offer/OffersSection.astro";

export const offerSections: Record<string, any> = {
  [OfferSections.HERO_SECTION]: HeroSection,
  [OfferSections.OFFERS_SECTION]: OffersSection,
  [OfferSections.CONTACT_SECTION]: ContactSection,
};

export function mapOfferSectionToComponent(offerSection: string) {
  const componentToDisplay = offerSections[offerSection];

  return componentToDisplay;
}
