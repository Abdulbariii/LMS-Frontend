import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import routesConfig from "./routes/router";
import { lightGreen } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: lightGreen[800],
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={createBrowserRouter(routesConfig)} />
    </ThemeProvider>
  );
}

export default App;
