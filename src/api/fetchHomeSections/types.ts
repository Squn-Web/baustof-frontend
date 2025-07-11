import type { HomeSections } from "../../page-mappers/home/home.enum";

export interface FetchHomeSectionsResponse {
  sections: Section[];
}

export interface Section {
  _key: string;
  _type: HomeSections;
  actionButtons?: ActionButton[];
  image?: Image;
  logo?: Logo;
  text: any;
  // actionButton?: ActionButton2;
  title?: string;
  cards?: Card[];
  subTitle?: string;
}

export interface ActionButton {
  _key: string;
  _type: string;
  href: string;
  text: string;
}

export interface Image {
  _type: string;
  alt: string;
  asset: Asset;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Logo {
  _type: string;
  alt: string;
  asset: Asset2;
}

export interface Asset2 {
  _ref: string;
  _type: string;
}

// export interface ActionButton2 {
//   _type: string;
//   href: string;
//   text: string;
// }

export interface Card {
  _key: string;
  _type: string;
  icon: Icon;
  subTitle: string;
  title: string;
}

export interface Icon {
  _type: string;
  alt: string;
  asset: Asset3;
}

export interface Asset3 {
  _ref: string;
  _type: string;
}
