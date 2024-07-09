import { useContext } from "react";
import { UserContext } from "../context/userContextProvider";

// custom hook for Auth
export const useAuth = () => {
  const { isAuthenticated } = useContext(UserContext);
  return isAuthenticated;
};
