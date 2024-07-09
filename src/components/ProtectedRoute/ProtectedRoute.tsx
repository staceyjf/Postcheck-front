import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/userContextProvider";
import { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  // navigate back to the home page without edit and delete
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return children;
};
