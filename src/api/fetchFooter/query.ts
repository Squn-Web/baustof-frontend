import { fetchSanity } from "../../lib/api";

const query = `
*[_type == "footer"][0]
`;

export async function fetchFooter(): Promise<any> {
  return fetchSanity<any>(query);
}
