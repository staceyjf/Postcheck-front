import { useNavigate } from "react-router-dom";
import { UserForm } from "../../services/api-responses.interfaces";
import { Box, Skeleton, Snackbar, Alert } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContextProvider";
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm";
import { registerUser } from "../../services/user-services";

interface CreateNewUserPageProps {
  mode: "Create" | "Edit";
}

const CreateNewUserPage = ({ mode }: CreateNewUserPageProps) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);
  const [fetchStatus, setFetchStatus] = useState<string>("SUCCESS");
  // TASK: change this to loading when adding edit user functionality
  const [open, setOpen] = useState(false);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = (user: UserForm) => {
    console.log(user);
    registerUser(user)
      .then((data) => {
        setFetchStatus("SUCCESS");
        setUser(data);
        navigate("/");
        setError(null);
      })
      .catch((e: Error) => {
        setError(e.message);
        setOpen(true);
        console.error("ERROR: " + e);
      });
  };

  return (
    <Box width="100%">
      {fetchStatus === "LOADING" && (
        <>
          <Box
            display="flex"
            flexDirection="column"
            rowGap="0.5rem"
            justifyContent="center"
            data-testid="loading"
          >
            <Skeleton />
            <Skeleton width="60%" />
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
          </Box>
        </>
      )}
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            severity="error"
            variant="filled"
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
      {fetchStatus === "SUCCESS" && (
        <>
          <CreateUserForm onSubmit={onSubmit} mode={mode} />
        </>
      )}
    </Box>
  );
};

export default CreateNewUserPage;
