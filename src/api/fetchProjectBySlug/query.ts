import { defineQuery } from "groq";
import type { GetProjectBySlugQueryResult } from "../../../sanity.types";
import { fetchSanity } from "../../lib/api";

const getProjectBySlugQuery = defineQuery(`
*[_type == "project" && slug.current == $slug]{
  ...,
  projectType->,
  categories[]->
  }
`);

export async function fetchProjectBySlug(
  slug: string,
): Promise<GetProjectBySlugQueryResult[number]> {
  const result = await fetchSanity<GetProjectBySlugQueryResult>(
    getProjectBySlugQuery,
    { slug },
  );

  const project = result[0];

  if (!project) {
    throw new Error(`No project with slug ${slug} found`);
  }

  return project;
}
