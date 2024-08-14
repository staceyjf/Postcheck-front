import { createContext, useState, useEffect } from "react";
import { UserResponse } from "../services/api-responses.interfaces";
import { signIn } from "../services/user-services";
import { getToken } from "../services/utils";

interface UserContext {
  user: UserResponse | null;
  isAuthenticated: boolean;
  setUser: (user: UserResponse | null) => void;
  userSignIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

// default is provided when the context is consumed without a provider
const defaults: UserContext = {
  user: null,
  isAuthenticated: false,
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // prevents the user having to resign in if refreshed
  useEffect(() => {
    const userToken = getToken();
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

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
      setIsAuthenticated(true);
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
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
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
