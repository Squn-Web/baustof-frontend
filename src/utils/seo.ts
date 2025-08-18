import type { Seo, SiteSettings, CustomImage } from "../../sanity.types";
import { urlForImage } from "../lib/urlForImage";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    image?: string;
    type: string;
  };
  noIndex: boolean;
}

interface MergeSEOParams {
  seo?: Seo | null;
  siteSettings: SiteSettings;
  currentPath: string;
  pageTitle?: string | null;
}

export function mergeSEOData({
  seo,
  siteSettings,
  currentPath,
  pageTitle,
}: MergeSEOParams): SEOConfig {
  const normalizedPath = currentPath.replace(/\/$/, "") || "/";
  const canonical =
    seo?.canonicalUrl || `${siteSettings.siteUrl}${normalizedPath}`;

  const title = seo?.metaTitle || pageTitle || siteSettings.title;
  const description = seo?.metaDescription || siteSettings.description;
  const keywords = seo?.keywords || siteSettings.keywords;

  const ogTitle = seo?.openGraphTitle || title;
  const ogDescription = seo?.openGraphDescription || description;
  const ogImage = getOpenGraphImage(
    seo?.openGraphImage,
    siteSettings.defaultOgImage,
  );

  return {
    title,
    description,
    keywords,
    canonical,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      type: "website",
    },
    noIndex: seo?.noIndex || false,
  };
}

function getOpenGraphImage(
  seoImage?: CustomImage | null,
  defaultImage?: CustomImage | null,
): string | undefined {
  const image = seoImage || defaultImage;
  if (!image?.asset) return undefined;

  try {
    return urlForImage(image).width(1200).height(630).url();
  } catch {
    return undefined;
  }
}

export function generateFullTitle(title: string, siteName: string): string {
  return title === siteName ? title : `${title} | ${siteName}`;
}

export function generateOrganizationSchema(siteSettings: SiteSettings) {
  if (!siteSettings.organization) return null;

  const org = siteSettings.organization;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    url: siteSettings.siteUrl,
    ...(org.logo && {
      logo: getOpenGraphImage(org.logo),
    }),
    ...(org.address && { address: org.address }),
    ...(org.phone && { telephone: org.phone }),
    ...(org.email && { email: org.email }),
    ...(siteSettings.socialMedia && {
      sameAs: Object.values(siteSettings.socialMedia).filter(Boolean),
    }),
  };
}
