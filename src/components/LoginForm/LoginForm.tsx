import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "../../context/userContextProvider";
import styles from "./LoginForm.module.scss";
import { UserResponse } from "../../services/api-responses.interfaces";

// define the props
interface LoginFormProps {
  placeholderUsername: string;
  placeholderPassword: string;
  onSubmit: (username: string, password: string) => void;
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
  const { setUser } = useContext(UserContext);

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
    const user: UserResponse = {
      username: username,
    };
    setUser(user);
    onSubmit(username, password);
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
            placeholder={placeholderUsername}
            name="username"
            onChange={onChange}
          />
          <input
            type="password"
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
