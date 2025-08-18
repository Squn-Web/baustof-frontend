import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetContactSectionsQueryResult } from "../../../../sanity.types";

const getContactSectionsQuery = defineQuery(`
*[_type == "contactPage"]
{
title,
sections,
seo
}
`);

export async function fetchContactSections(): Promise<
  GetContactSectionsQueryResult[number]
> {
  const result = await fetchSanity<GetContactSectionsQueryResult>(
    getContactSectionsQuery,
  );

  const contactPage = result[0];

  if (!contactPage) {
    throw new Error("Contact page is not defined in cms");
  }

  return contactPage;
}
