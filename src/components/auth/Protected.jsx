import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";

const Protected = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation().pathname;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

Protected.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Protected;
