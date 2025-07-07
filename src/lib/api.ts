import { sanityClient } from 'sanity:client';

export async function fetchSanity<T>(query: string): Promise<T> {
  const response = await sanityClient.fetch(query);
  return response;
}
