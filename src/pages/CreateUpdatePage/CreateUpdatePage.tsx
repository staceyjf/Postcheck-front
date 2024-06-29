import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPostCode,
  getPostCodebyId,
  updatePostCodeById,
} from "../../services/postcode-services";
import {
  PostCodeForm,
  SuburbResponse,
} from "../../services/api-responses.interfaces";
import { getAllSuburbs } from "../../services/suburb-services";
import { Alert, Box, Skeleton, Snackbar } from "@mui/material";
import CreateUpdateForm from "../../components/CreateUpdateForm/CreateUpdateForm";

interface CreateUpdatePageProps {
  mode: string;
}

const CreateUpdatePage = ({ mode }: CreateUpdatePageProps) => {
  const navigate = useNavigate();
  const { id: idParam } = useParams();
  const Id = Number(idParam);
  const [defaultValues, setDefaultValues] = useState<
    PostCodeForm | undefined
  >();
  const [suburbs, setSuburbs] = useState<SuburbResponse[]>([]);
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
      getPostCodebyId(Id)
        .then((data) => {
          setFetchStatus("SUCCESS");
          const newDefaultValues = {
            id: data.id,
            postcode: data.postcode,
            associatedSuburbs: data.associatedSuburbs,
          };
          setDefaultValues(newDefaultValues);
        })
        .catch((e: Error) =>
          handleError(
            "Failed to fetch Postcode. Please try again.",
            `ERROR: failed to update id: ${Id}, ${e.message}`
          )
        );
    }

    getAllSuburbs()
      .then((data) => {
        setFetchStatus("SUCCESS");
        setSuburbs(data);
      })
      .catch((e: Error) =>
        handleError(
          "Failed to fetch suburbs. Please try again.",
          "ERROR: failed to fetch all suburbs, " + e.message
        )
      );
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

  const onSubmit = (postcode: string, suburbIds: number[]) => {
    const data = { postcode, suburbIds };
    if (mode === "Edit") {
      updatePostCodeById(Id, data)
        .then(() => {
          navigate("/");
          setError(null);
        })
        .catch((e: Error) => {
          setError(`Failed to update postcode. Please try again.`);
          setOpen(true);
          console.error(
            "ERROR: failed to update item with id: " + Id + ", " + e
          );
        });
    } else {
      createPostCode(data)
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
            <span style={{ fontStyle: "italic" }}>
              {defaultValues?.postcode}
            </span>{" "}
            Postcode
          </h1>
          {defaultValues && (
            <CreateUpdateForm
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              suburbs={suburbs}
              mode="Edit"
            />
          )}
          {!defaultValues && (
            <CreateUpdateForm
              onSubmit={onSubmit}
              mode="Create"
              suburbs={suburbs}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default CreateUpdatePage;
