import { useState } from "react";
import {
  UserForm,
  UserResponse,
} from "../../services/api-responses.interfaces";

interface CreateUserFormProps {
  user: UserResponse | null;
  mode: "Create" | "Edit";
  onSubmit: (user: UserForm) => void;
}

const CreateUserForm = ({ user, mode, onSubmit }: CreateUserFormProps) => {
  const [username, setUsername] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    const field = e.target.name;
    let setter;

    switch (field) {
      case `username`:
        if ((inputValue = "")) {
          setUsernameError("Username can not be blank");
        }
        if (inputValue) {
          setter = setUsername;
        }
        break;
      case `password`:
        if ((inputValue = "")) {
          setPasswordError("Password can not be blank");
        }
        if (inputValue) {
          setter = setPassword;
        }

        break;
      case `email`:
        if ((inputValue = "")) {
          setEmailError("Email can not be blank");
        }
        if (inputValue) {
          setter = setEmail;
        }
        break;
      default:
        console.warn("Unknown field");
        break;
    }

    if (setter) {
      setter(inputValue);
    }
  };

  return <div>CreateUserForm {mode}</div>;
};

export default CreateUserForm;
