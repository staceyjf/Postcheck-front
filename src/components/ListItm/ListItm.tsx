import { Box, IconButton, useTheme, TableCell } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";

// define the props
interface ListItmProps {
  id: number | undefined;
  postcode: string;
  suburbName: string;
  suburbState: string;
  deleteOnClick: (id: number | undefined) => void;
  handleEdit: (id: number | undefined) => void;
}

const ListItm = ({
  id,
  postcode,
  suburbName,
  suburbState,
  deleteOnClick,
  handleEdit,
}: ListItmProps) => {
  const theme = useTheme();
  const isAuthenticated = useAuth();

  return (
    <>
      <TableCell sx={{ color: theme.palette.primary.main }}>
        {postcode}
      </TableCell>
      <TableCell sx={{ textTransform: "capitalize" }}>
        {suburbState !== "" ? `${suburbName}, ${suburbState}` : `${suburbName}`}
      </TableCell>
      <TableCell>
        {isAuthenticated && (
          <Box
            display="flex"
            flexDirection="row"
            alignContent="center"
            justifyContent="flex-end"
            columnGap="0.5em"
          >
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteOnClick(id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => handleEdit(id)}
            >
              <EditIcon />
            </IconButton>
          </Box>
        )}
      </TableCell>
    </>
  );
};

export default ListItm;
