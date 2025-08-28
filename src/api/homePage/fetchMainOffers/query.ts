import type { GetMainOffersQueryResult } from "../../../../sanity.types";
import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";

const getMainOffersQuery = defineQuery(`
*[_type == "offer" && main == true]
`);

export async function fetchMainOffers(): Promise<GetMainOffersQueryResult> {
  const result = await fetchSanity<GetMainOffersQueryResult>(getMainOffersQuery);

  return result;
}
