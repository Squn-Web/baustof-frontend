import { fetchSanity } from "../../../lib/api";
import { defineQuery } from "groq";
import type { GetProjectTypeQueryResult } from "../../../../sanity.types";

const getProjectTypeQuery = defineQuery(`
*[_type == "projectType"] | order(name asc){
  _id,
  slug,
  name
}
`);

export async function fetchProjectType(): Promise<GetProjectTypeQueryResult> {
  const result =
    await fetchSanity<GetProjectTypeQueryResult>(getProjectTypeQuery);

  return result;
}
