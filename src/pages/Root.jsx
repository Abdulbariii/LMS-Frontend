import SideBar from "../layout/SideBar";
import AuthContextProvider from "../components/auth/context/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Root = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthContextProvider>
        <div id="root-container" data-testid="root-container">
          <SideBar />
          {/* the outlet of the login page */}
        </div>
      </AuthContextProvider>
    </LocalizationProvider>
  );
};

export default Root;
