import { createContext, useState } from "react";
import { UserResponse } from "../services/api-responses.interfaces";
import { signIn } from "../services/user-services";

interface UserContext {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  userSignIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

// default is provided when the context is consumed without a provider
const defaults: UserContext = {
  user: null,
  setUser: () => {
    throw new Error("setUser must be used within a UserContextProvider");
  },
  userSignIn: async () => {
    throw new Error("signIn must be used within a UserContextProvider");
  },
  signOut: () => {
    throw new Error("signOut must be used within a UserContextProvider");
  },
};

export const UserContext = createContext(defaults);

interface UserContextProviderProps {
  // allows for all valid types including numbers, strings etc
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  const userSignIn = async (username: string, password: string) => {
    try {
      const response = await signIn(username, password);
      const token = response ? response.accessToken : null;
      if (!token) {
        console.error("ERROR: Received null token.");
        throw new Error(
          "There was an issue with signing in. Please try again."
        );
      }
      localStorage.setItem("token", token);
      const signedInUser: UserResponse = {
        username: username,
      };
      setUser(signedInUser);
    } catch (error) {
      console.error("ERROR: " + error);
      throw new Error("There was an issue with signing in. Please try again.");
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userSignIn,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
