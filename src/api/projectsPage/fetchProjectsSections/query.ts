import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetProjectsSectionsQueryResult } from "../../../../sanity.types";

const getProjectsSectionsQuery = defineQuery(`
*[_type == "projectsPage"]
{
title,
sections,
seo
}
`);

export async function fetchProjectsSections(): Promise<
  GetProjectsSectionsQueryResult[number]
> {
  const result = await fetchSanity<GetProjectsSectionsQueryResult>(
    getProjectsSectionsQuery,
  );

  const projectsPage = result[0];

  if (!projectsPage) {
    throw new Error("Projects page is not defined in cms");
  }

  return projectsPage;
}
