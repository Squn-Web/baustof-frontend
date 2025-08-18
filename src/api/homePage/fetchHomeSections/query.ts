import type { GetHomeSectionsQueryResult } from "../../../../sanity.types";
import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";

const getHomeSectionsQuery = defineQuery(`
*[_type == "homePage"]
{
title,
sections,
seo
}
`);

export async function fetchHomeSections(): Promise<
  GetHomeSectionsQueryResult[number]
> {
  const result =
    await fetchSanity<GetHomeSectionsQueryResult>(getHomeSectionsQuery);

  const homePage = result[0];

  if (!homePage) {
    throw new Error("Home page is not defined in cms");
  }

  return homePage;
}
