import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";
import { Box, Button } from "@mui/material";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Something has gone wrong";
    return () => {
      document.title =
        "PostCheck - your easy to use PostCode and Suburb checker";
    };
  }, []);

  return (
    <Box>
      <div className={styles.NotFoundPage}>
        <h1>Oops!</h1>
        <p>We can't seem to find the page you're looking for.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <Button onClick={() => navigate("/")}>Home</Button>
      </div>
    </Box>
  );
};

export default NotFoundPage;
