export const baseUrl = "https://egf-logistics-admin-nine.vercel.app";
 export const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND_NOTIFICATION_TASK';

 

export const buildDynamicURL = (
  base: string,
  requestType?: string | number
): string => {
  let baseURL = `${base}`;
  const queryParams: string[] = [];

  // Add 'requestType' to the query parameters if it's not null or undefined
  if (requestType !== null && requestType !== undefined) {
    queryParams.push(`requestType=${requestType}`);
  }

  // Combine the base URL and query parameters
  if (queryParams.length > 0) {
    baseURL += "?" + queryParams.join("&");
		}
 

  return baseURL;
};

  
 