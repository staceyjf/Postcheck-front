import { FormEvent, useEffect, useState } from "react";
import { Box, FormControl, TextField, Button } from "@mui/material"; // Assuming Material-UI components
import { UserForm } from "../../services/api-responses.interfaces";

interface CreateUserFormProps {
  mode: "Create" | "Edit";
  onSubmit: (user: UserForm) => void;
}

const CreateUserForm = ({ mode, onSubmit }: CreateUserFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    setIsFormComplete(
      username.trim() !== "" && password.trim() !== "" && email.trim() !== ""
    );
  }, [username, password, email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const field = e.target.name;
    let setter;

    switch (field) {
      case "username":
        setUsernameError(inputValue === "" ? "Username cannot be blank" : null);
        setter = setUsername;
        break;
      case "password":
        if (inputValue === "") {
          setPasswordError("Password cannot be blank");
        } else if (!/(?=.*\d)(?=.*[a-zA-Z])/.test(inputValue)) {
          setPasswordError(
            "Password needs to contain at least one numerical value and one letter."
          );
        } else {
          setPasswordError(null);
        }
        setter = setPassword;
        break;
      case "confirmPassword":
        setPasswordError(
          inputValue != password ? "Passwords do not match" : null
        );
        setter = setConfirmPassword;
        break;
      case "email":
        if (inputValue === "") {
          setEmailError("Email cannot be blank");
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputValue)
        ) {
          setEmailError("Email need to be in a standardised email format.");
        } else {
          setEmailError(null);
        }
        setter = setEmail;
        break;
      default:
        console.warn("Unknown field");
        break;
    }

    if (setter) {
      setter(inputValue);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      username &&
      password &&
      confirmPassword &&
      email &&
      !usernameError &&
      !passwordError &&
      !emailError &&
      password === confirmPassword // Ensure passwords match
    ) {
      const userForm: UserForm = { username, password, email };
      onSubmit(userForm);
    } else {
      setEmailError("Form is incomplete or contains errors.");
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={handleSubmit} style={{ width: "65%" }}>
        <FormControl fullWidth>
          <TextField
            color="secondary"
            size="small"
            margin="dense"
            error={!!usernameError}
            id="username"
            name="username"
            label="Username"
            helperText={usernameError || ""}
            variant="filled"
            onChange={handleChange}
          />
          <TextField
            color="secondary"
            size="small"
            margin="dense"
            error={!!passwordError}
            id="password"
            name="password"
            label="Password"
            helperText={passwordError || ""}
            variant="filled"
            onChange={handleChange}
            type="password"
          />
          <TextField
            color="secondary"
            size="small"
            margin="dense"
            error={!!passwordError}
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            variant="filled"
            onChange={handleChange}
            type="password"
          />
          <TextField
            color="secondary"
            size="small"
            margin="dense"
            error={!!emailError}
            id="email"
            name="email"
            label="Email"
            helperText={emailError || ""}
            variant="filled"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ margin: "3.5em" }}
            disabled={!isFormComplete}
          >
            {mode}
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default CreateUserForm;
