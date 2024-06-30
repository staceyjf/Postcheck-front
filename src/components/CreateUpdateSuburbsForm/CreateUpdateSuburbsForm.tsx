import { FormEvent, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { SuburbForm } from "../../services/api-responses.interfaces";
import { convertStateTypeToString, states, StateType } from "./AusStates";

interface CreateUpdateSuburbsFormProps {
  defaultValues?: SuburbForm;
  mode: "Create" | "Edit";
  onSubmit: (name: string, state: string) => void;
}

const CreateUpdateSuburbsForm = ({
  defaultValues,
  mode,
  onSubmit,
}: CreateUpdateSuburbsFormProps) => {
  const [suburb, setSuburb] = useState<string | null>(null);
  const [suburbError, setSuburbError] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<StateType | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const field = e.target.name;

    if (field === "name") {
      if (inputValue === "") {
        setSuburbError(`Suburb is missing.`);
      } else {
        setSuburbError(null);
      }
      setSuburb(inputValue);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = suburb;
    const state = convertStateTypeToString(selectedState);

    if (!selectedState) setStateError(`State is missing.`);

    if (name && selectedState) {
      onSubmit(name, state);
    }
  };

  return (
    <>
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
              error={!!suburbError}
              id="name"
              name="name"
              label="Suburb name"
              defaultValue={defaultValues?.name}
              helperText={suburbError || ""}
              variant="filled"
              onChange={handleChange}
            />

            <Autocomplete
              id="state"
              isOptionEqualToValue={(option, value) =>
                option.state === value.state
              }
              options={states}
              value={selectedState}
              onChange={(_event, newValue) => {
                setSelectedState(newValue);
                setStateError(null);
              }}
              getOptionLabel={(option) => `${option.state}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  color="secondary"
                  size="small"
                  margin="dense"
                  label="States"
                  error={!!stateError}
                  helperText={stateError || ""}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ margin: "3.5em" }}
            >
              {mode}
            </Button>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default CreateUpdateSuburbsForm;
