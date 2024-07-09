import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import UserContextProvider from "./context/userContextProvider";

import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styling/theme";
import IndexPage from "./pages/IndexPage/IndexPage";
import "./App.scss";
import { Container, Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import CreateUpdatePage from "./pages/CreateUpdatePage/CreateUpdatePage";
import CreateUpdateSuburbsPage from "./pages/CreateUpdateSuburbsPage/CreateUpdateSuburbsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import CreateNewUserPage from "./pages/CreateNewUserPage/CreateNewUserPage";
import ReportingPage from "./pages/ReportingPage/ReportingPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Normalization add  */}
        <CssBaseline />
        <UserContextProvider>
          <Box
            height="100vh"
            width="100%"
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: "5em",
              paddingBottom: "5em",
              background: theme.palette.primary.light,
              overflow: "auto",
              zIndex: 0,
            }}
          >
            <Box
              height="45vh"
              width="100%"
              sx={{
                position: "absolute",
                top: 0,
                backgroundColor: theme.palette.secondary.main,
                zIndex: 1,
              }}
            />
            <Container
              maxWidth="lg"
              sx={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: "2rem",
                backgroundColor: "white",
                mx: "auto",
                borderRadius: "1rem",
                padding: 2,
              }}
            >
              <BrowserRouter basename="/Postcheck">
                <Navbar />
                <Box
                  flexGrow={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={1}
                  mb={1}
                  px={3}
                  width="100%"
                >
                  <Routes>
                    <Route path="/" element={<IndexPage />} />
                    <Route
                      path="/postcodes/create"
                      element={
                        <ProtectedRoute>
                          <CreateUpdatePage mode="Create" />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/suburbs/create"
                      element={
                        <ProtectedRoute>
                          <CreateUpdateSuburbsPage mode="Create" />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/postcodes/:id/edit"
                      element={
                        <ProtectedRoute>
                          <CreateUpdatePage mode="Edit" />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        <ProtectedRoute>
                          <CreateNewUserPage mode="Create" />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/reporting"
                      element={
                        <ProtectedRoute>
                          <ReportingPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Box>
              </BrowserRouter>
            </Container>
          </Box>
        </UserContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
