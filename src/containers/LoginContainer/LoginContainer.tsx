import { useState, useContext } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { UserContext } from "../../context/userContextProvider";
import { UserResponse } from "../../services/api-responses.interfaces";

const LoginContainer = () => {
  const [error, setError] = useState<string | null>(null);
  const { user, setUser, userSignIn } = useContext(UserContext);

  const onSubmit = (
    username: string,
    password: string,
    signedInUser: UserResponse
  ) => {
    userSignIn(username, password)
      .then(() => setUser(signedInUser))
      .catch((e: unknown) => {
        setError("Failed to sign in. Please try again.");
        console.error("ERROR: " + e);
      });
  };

  return (
    <>
      {!user && (
        <LoginForm
          placeholderUsername="Username"
          placeholderPassword="Password"
          onSubmit={onSubmit}
          error={error}
          setError={setError}
        />
      )}
    </>
  );
};

export default LoginContainer;
