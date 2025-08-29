import { defineQuery } from "groq";
import type { GetOfferBySlugQueryResult } from "../../../sanity.types";
import { fetchSanity } from "../../lib/api";

const getOfferBySlugQuery = defineQuery(`
*[_type == "offer" && slug.current == $slug]{
  seo,
  name,
  heroImage,
  icon,
  description,
  usageActionButtons,
  usageSubTitle,
  usageTitle,
  slug
}
`);

export async function fetchOfferBySlug(
  slug: string,
): Promise<GetOfferBySlugQueryResult[number]> {
  const result = await fetchSanity<GetOfferBySlugQueryResult>(
    getOfferBySlugQuery,
    { slug },
  );

  const offer = result[0];

  if (!offer) {
    throw new Error(`No offer with slug ${slug} found`);
  }

  return offer;
}
