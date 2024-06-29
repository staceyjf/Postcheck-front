import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import UserContextProvider from "../../context/userContextProvider";

describe("LoginForm", () => {
  const onSubmit = vi.fn((fn) => fn); //mock up of a function
  const setError = vi.fn();

  it("should call onSubmit, with the value of the LoginForm for Create Mode", async () => {
    render(
      <UserContextProvider>
        <LoginForm
          onSubmit={onSubmit}
          placeholderUsername="Username"
          placeholderPassword="Password"
          error="Error test"
          setError={setError}
        />
      </UserContextProvider>
    );

    const name = await screen.findByPlaceholderText("Username");
    const password = await screen.findByPlaceholderText("Password");
    const form = screen.getByTestId("login-form");

    const user = userEvent.setup();
    await user.type(name, "admin");
    await user.type(password, "admin");

    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("should should render user input correctly", async () => {
    render(
      <LoginForm
        onSubmit={onSubmit}
        placeholderUsername="Username"
        placeholderPassword="Password"
        error="Error test"
        setError={setError}
      />
    );

    const name = await screen.findByPlaceholderText("Username");
    const password = await screen.findByPlaceholderText("Password");

    const user = userEvent.setup();
    await user.type(name, "admin");
    await user.type(password, "admin");

    expect(name).toHaveValue("admin");
    expect(password).toHaveValue("admin");
  });
});
