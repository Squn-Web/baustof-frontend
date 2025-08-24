import { defineQuery } from "groq";
import { fetchSanity } from "../../../lib/api";
import type { GetProjectsQueryResult } from "../../../../sanity.types";

const getLatestThreeProjectsWithMatchingTypeQuery = defineQuery(`
*[_type == "project" && projectType._ref == $projectTypeRef && slug.current != $currentProjectSlug]
| order(_createdAt desc)
[0...3]{
_id,
title,
startDate,
city,
text,
_createdAt,
image,
slug,
actionButtonText,
  ...,
  projectType->,
  categories[]->
}

`);

export async function fetchLatestThreeProjectsWithMatchingType(
  projectTypeRef: string,
  currentProjectSlug: string,
): Promise<GetProjectsQueryResult> {
  return fetchSanity<GetProjectsQueryResult>(
    getLatestThreeProjectsWithMatchingTypeQuery,
    { projectTypeRef, currentProjectSlug },
  );
}
