import { useNavigate } from "react-router-dom";
import {
  UserForm,
  UserResponse,
} from "../../services/api-responses.interfaces";
import { Box, Skeleton, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm";

interface CreateNewUserPageProps {
  mode: string;
}

const CreateNewUserPage = ({ mode }: CreateNewUserPageProps) => {
  const navigate = useNavigate();
  const [user, setUSer] = useState<UserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchStatus, setFetchStatus] = useState<string>("LOADING");
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
    // createUser(user)
    //   .then(() => {
    //     navigate("/");
    //     setError(null);
    //   })
    //   .catch((e: Error) => {
    //     setError(e.message);
    //     setOpen(true);
    //     console.error("ERROR: " + e);
    //   });
  };

  return (
    <Box width="100%">
      {/* {fetchStatus === "LOADING" && (
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
      {fetchStatus === "SUCCESS" && ( */}
      <>
        <CreateUserForm onSubmit={onSubmit} mode="Create" />
      </>
      {/* )} */}
    </Box>
  );
};

export default CreateNewUserPage;
