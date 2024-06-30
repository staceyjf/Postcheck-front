import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./LoginForm.module.scss";
import { UserResponse } from "../../services/api-responses.interfaces";

// define the props
interface LoginFormProps {
  placeholderUsername: string;
  placeholderPassword: string;
  onSubmit: (username: string, password: string, user: UserResponse) => void;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

const LoginForm = ({
  placeholderUsername,
  placeholderPassword,
  onSubmit,
  error,
  setError,
}: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    setIsFormComplete(username.trim() !== "" && password.trim() !== "");
  }, [username, password]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name === "username" ? setUsername(value) : setPassword(value);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signedInUser: UserResponse = {
      username: username,
    };
    onSubmit(username, password, signedInUser);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        data-testid="login-form"
      >
        <div className={styles.form_container}>
          <input
            type="text"
            id="username"
            placeholder={placeholderUsername}
            name="username"
            onChange={onChange}
          />
          <input
            type="password"
            id="password"
            placeholder={placeholderPassword}
            name="psw"
            onChange={onChange}
          />

          <button disabled={!isFormComplete}>Login</button>
        </div>
        <div>
          <small>{error || ""}</small>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
