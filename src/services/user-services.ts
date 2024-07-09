import { baseUrl } from "./api-config";
import { UserForm, UserResponse } from "./api-responses.interfaces";

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
