import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetAboutSectionsQueryResult } from "../../../../sanity.types";

const getAboutSectionsQuery = defineQuery(`
*[_type == "aboutPage"]
{
title,
sections,
seo
}
`);

export async function fetchAboutSections(): Promise<
  GetAboutSectionsQueryResult[number]
> {
  const result = await fetchSanity<GetAboutSectionsQueryResult>(
    getAboutSectionsQuery,
  );

  const aboutPage = result[0];

  if (!aboutPage) {
    throw new Error("About page is not defined in cms");
  }

  return aboutPage;
}
