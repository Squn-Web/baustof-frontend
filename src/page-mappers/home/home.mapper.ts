import Hero from "../../components/home/Hero.astro";
import Praise from "../../components/home/Praise.astro";
import { HomeSections } from "./home.enum";

//@ts-ignore
export const homeSections: Record<HomeSections, any> = {
  [HomeSections.HERO_SECTION]: Hero,
  [HomeSections.PRAISE_SECTION]: Praise,
  // [HomeSections.ABOUT_SECTION]: null,
  //   [HomeSections.CONTACT_SECTION]: null,
  //   [HomeSections.OFFERS_SECTION]: null,
  //   [HomeSections.PROJECTS_SECTION]: null,
};

export function mapHomeSectionToComponent(homeSection: HomeSections) {
  const componentToDisplay = homeSections[homeSection];

  return componentToDisplay;
}
