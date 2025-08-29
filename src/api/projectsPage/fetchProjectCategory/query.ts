import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetProjectCategoryQueryResult } from "../../../../sanity.types";

const getProjectCategoryQuery = defineQuery(`
*[_type == "projectCategory"] | order(title asc){
  _id,
  slug,
  name
}
`);

export async function fetchProjectsCategory(): Promise<GetProjectCategoryQueryResult> {
  const result = await fetchSanity<GetProjectCategoryQueryResult>(
    getProjectCategoryQuery,
  );

  return result;
}
