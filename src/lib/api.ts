import { sanityClient } from "sanity:client";

export async function fetchSanity<T>(
  query: string,
  options: any = {},
): Promise<T> {
  const response = await sanityClient.fetch(query, options);
  return response;
}
