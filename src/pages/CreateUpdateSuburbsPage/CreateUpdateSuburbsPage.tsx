import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createSuburb,
  getSuburbById,
  updateSuburbById,
} from "../../services/suburb-services";
import { Alert, Box, Skeleton, Snackbar } from "@mui/material";
import CreateUpdateSuburbsForm from "../../components/CreateUpdateSuburbsForm/CreateUpdateSuburbsForm";
import { SuburbForm } from "../../services/api-responses.interfaces";

interface CreateUpdateSuburbsPageProps {
  mode: string;
}

const CreateUpdateSuburbsPage = ({ mode }: CreateUpdateSuburbsPageProps) => {
  const navigate = useNavigate();
  const { id: idParam } = useParams();
  const Id = Number(idParam);
  const [defaultValues, setDefaultValues] = useState<SuburbForm | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [fetchStatus, setFetchStatus] = useState<string>("LOADING");
  const [open, setOpen] = useState(false);

  // helper error to reduce code in the useEffect
  const handleError = (errorMessage: string, errorLog: string) => {
    setError(errorMessage);
    setOpen(true);
    console.error(errorLog);
  };

  useEffect(() => {
    if (mode === "Edit") {
      getSuburbById(Id)
        .then((data) => {
          setFetchStatus("SUCCESS");
          const newDefaultValues: SuburbForm = {
            id: data.id,
            name: data.name,
            state: data.state,
          };
          setDefaultValues(newDefaultValues);
        })
        .catch((e: Error) =>
          handleError(
            "Failed to fetch Suburb. Please try again.",
            `ERROR: failed to update id: ${Id}, ${e.message}`
          )
        );
    } else {
      setFetchStatus("SUCCESS");
    }
  }, []);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = (name: string, state: string) => {
    const data = { name, state };

    if (mode === "Edit") {
      updateSuburbById(Id, data)
        .then(() => {
          navigate("/");
          setError(null);
        })
        .catch((e: Error) => {
          setError(e.message);
          setOpen(true);
          console.error(
            "ERROR: failed to update item with id: " + Id + ", " + e
          );
        });
    } else {
      createSuburb(data)
        .then(() => {
          navigate("/");
          setError(null);
        })
        .catch((e: Error) => {
          setError(e.message);
          setOpen(true);
          console.error("ERROR: " + e);
        });
    }
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
          <h1>
            {mode}{" "}
            <span style={{ fontStyle: "italic" }}>{defaultValues?.name}</span>{" "}
            Suburb
          </h1>
          {defaultValues && (
            <CreateUpdateSuburbsForm
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              mode="Edit"
            />
          )}
          {!defaultValues && (
            <CreateUpdateSuburbsForm onSubmit={onSubmit} mode="Create" />
          )}
        </>
      )}
    </Box>
  );
};

export default CreateUpdateSuburbsPage;
