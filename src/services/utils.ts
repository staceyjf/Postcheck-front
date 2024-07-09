export const getToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(atob(token.split(".")[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  // checks if the token has expired
  if (payload.ex * 1000 < Date.now()) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem("token");
    console.error("ERROR: Token is not valid");
    throw new Error("There was an issue with signing in. Please try again.");
  }

  return token;
};

// helper function to add the token
// RequestInit - interface from fetch which represent the options you can
// set for a request
export const fetchWithToken = async (
  url: string,
  options: RequestInit = {}
) => {
  const token = getToken();
  if (!token) throw new Error("Access restricted - please log in.");

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  console.log(url)

  return fetch(url, options);
};
