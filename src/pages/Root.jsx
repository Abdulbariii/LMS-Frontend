import SideBar from "../layout/SideBar";
import AuthContextProvider from "../components/auth/context/AuthContext";

const Root = () => {
  return (
    <AuthContextProvider>
      <div id="root-container" data-testid="root-container">
        <SideBar />
        {/* the outlet of the login page */}
      </div>
    </AuthContextProvider>
  );
};

export default Root;
