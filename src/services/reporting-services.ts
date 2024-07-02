import { baseUrl } from "./api-config";
import { ReportingResponse } from "./api-responses.interfaces";
import { fetchWithToken } from "./utils";

export const getPropertyPricingByState = async (): Promise<
  ReportingResponse[]
> => {
  const response: Response = await fetchWithToken(
    `${baseUrl}/reporting`
  );
  if (!response.ok) {
    const err = await response.json();
    console.error("Error:", err);
    throw new Error("Failed to fetch all PostCodes. Please try again later");
  }

  return await response.json();
};
