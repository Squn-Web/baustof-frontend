import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetProjectsQueryResult } from "../../../../sanity.types";

const getProjectsQuery = defineQuery(`
*[_type == "project"] | order(coalesce(date, _createdAt) desc) {
  ...,
  projectType->,
  categories[]->
}
`);

export async function fetchProjects(): Promise<GetProjectsQueryResult> {
  const result = await fetchSanity<GetProjectsQueryResult>(getProjectsQuery);

  return result;
}
