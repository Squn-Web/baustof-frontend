import { defineQuery } from "groq";
import { fetchSanity } from "../../../lib/api";
import type { GetLatestThreeProjectsQueryResult } from "../../../../sanity.types";

const getLatestThreeProjectsQuery = defineQuery(`
*[_type == "project"]
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

export async function fetchLatestThreeProjects(): Promise<GetLatestThreeProjectsQueryResult> {
  return fetchSanity<GetLatestThreeProjectsQueryResult>(getLatestThreeProjectsQuery);
}
