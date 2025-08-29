import { defineQuery } from "groq";
import { fetchSanity } from "../../lib/api";
import type { GetFooterQueryResult } from "../../../sanity.types";

const getFooterQuery = defineQuery(`
*[_type == "footer"]{
  headerIcon{
    asset,
    alt
  },
  headerTitle,
  headerSubTitle,
  headerButtonText,
  logo{
    asset,
    alt
  },
  description,
  addressLine{
    icon,
    text
  },
  contactPhone{
    icon,
    text
  },
  contactEmail{
    icon,
    text
  },
  workingHours{
    icon,
    text
  },
  author,
  nip,
  krs
}
`);

export async function fetchFooter(): Promise<GetFooterQueryResult[number]> {

  const result = await fetchSanity<GetFooterQueryResult>(getFooterQuery);

  const footer = result[0];

  if (!footer) {
    throw new Error("Footer is not defined in cms");
  }

  return footer;
}
