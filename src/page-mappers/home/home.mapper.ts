import Hero from '../../components/home/Hero.astro';
import { HomeSections } from './home.enum';

export const homeSections: Record<string, any> = {
  [HomeSections.HERO_SECTION]: Hero,
  //   [HomeSections.ABOUT_SECTION]: null,
  //   [HomeSections.CONTACT_SECTION]: null,
  //   [HomeSections.OFFERS_SECTION]: null,
  //   [HomeSections.PROJECTS_SECTION]: null,
  //   [HomeSections.PRAISE_SECTION]: null,
};

export function mapHomeSectionToComponent(homeSection: string) {
  const componentToDisplay = homeSections[homeSection];

  return componentToDisplay;
}
