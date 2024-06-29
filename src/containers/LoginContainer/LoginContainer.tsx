import { useState, useContext } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { UserContext } from "../../context/userContextProvider";

const LoginContainer = () => {
  const [error, setError] = useState<string | null>(null);
  const { user, userSignIn } = useContext(UserContext);

  const onSubmit = (username: string, password: string) => {
    userSignIn(username, password).catch((e: unknown) => {
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
