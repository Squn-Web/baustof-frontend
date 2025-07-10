import { fetchSanity } from '../../lib/api';
import type { FetchHomeSectionsResponse } from './types';

const query = `
*[_type == "homePage"][0]
{
sections
}
`;

export async function fetchHomeSections(): Promise<FetchHomeSectionsResponse> {
  return fetchSanity<FetchHomeSectionsResponse>(query);
}
