import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetOffersQueryResult } from "../../../../sanity.types";

const getOffersQuery = defineQuery(`
*[_type == "offer"]{
  slug,
  icon,
  name,
  shortDescription
}
`);

export async function fetchOffers(): Promise<GetOffersQueryResult> {
  const result = await fetchSanity<GetOffersQueryResult>(getOffersQuery);

  return result;
}
