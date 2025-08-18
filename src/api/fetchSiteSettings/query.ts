import { defineQuery } from "groq";
import { fetchSanity } from "../../lib/api";
import type {
  GetFooterQueryResult,
  GetSiteSettingsQueryResult,
} from "../../../sanity.types";

const getSiteSettingsQuery = defineQuery(`
*[_type == "siteSettings"]
`);

export async function fetchSiteSettings(): Promise<
  GetSiteSettingsQueryResult[number]
> {
  const result =
    await fetchSanity<GetSiteSettingsQueryResult>(getSiteSettingsQuery);

  const siteSettings = result[0];

  if (!siteSettings) {
    throw new Error("Site settings is not defined in cms");
  }

  return siteSettings;
}
