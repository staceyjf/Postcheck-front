import { baseUrl } from "./api-config";
import { UserForm, UserResponse } from "./api-responses.interfaces";

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

export const registerUser = async (user: UserForm): Promise<UserResponse> => {
  const response: Response = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const err = await response.json();
    console.error("Error:", err);
    throw new Error(err.message);
  }
  return await response.json(); // return the user
};

export const signIn = async (
  username: string,
  password: string
): Promise<{ accessToken: string }> => {
  const response: Response = await fetch(`${baseUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    console.error("Error:", err);
    throw new Error(
      "There was an issue with the login details. Please try again later"
    );
  }

  return await response.json(); // returns the token
};
