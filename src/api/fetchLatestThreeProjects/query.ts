import { fetchSanity } from "../../lib/api";

const query = `
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
actionButton
}
`;

export async function fetchLatestThreeProjects(): Promise<any> {
  return fetchSanity<any>(query);
}
