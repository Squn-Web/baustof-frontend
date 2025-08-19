import { defineQuery } from "groq";
import { fetchSanity } from "../../../lib/api";
import type { GetOfferSectionsQueryResult } from "../../../../sanity.types";

const getOfferSectionsQuery = defineQuery(`
*[_type == "offersPage"]
{
title,
sections,
seo
}
`);

export async function fetchOfferSections(): Promise<
  GetOfferSectionsQueryResult[number]
> {
  const result = await fetchSanity<GetOfferSectionsQueryResult>(
    getOfferSectionsQuery,
  );

  const offerPage = result[0];

  if (!offerPage) {
    throw new Error("Offer is not defined in cms");
  }

  return offerPage;
}
