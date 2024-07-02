import { useEffect, useState } from "react";
import styles from "./ReportingPage.module.scss";
import { Alert, Box, Skeleton, Snackbar } from "@mui/material";
import LineChart from "../../components/LineChart/LineChart";
import { getPropertyPricingByState } from "../../services/reporting-services";
import { ReportingResponse } from "../../services/api-responses.interfaces";

const ReportingPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [fetchStatus, setFetchStatus] = useState<string>("LOADING");
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState<ReportingResponse[]>([]);

  useEffect(() => {
    document.title = "PostCheck - interesting information of property";

    getPropertyPricingByState()
      .then((chartData) => {
        setFetchStatus("SUCCESS");
        setdata(chartData);
      })
      .catch((e: Error) =>
        setError(
          `There has been an issue with fetching the reporting. Please try again: ${e}`
        )
      );

    return () => {
      document.title =
        "PostCheck - your easy to use PostCode and Suburb checker";
    };
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
        <Box height="100%">
          <div className={styles.ReportingPage}>
            <h1>Property by state across time</h1>
            <LineChart data={data} />
          </div>
        </Box>
      )}
    </Box>
  );
};

export default ReportingPage;
