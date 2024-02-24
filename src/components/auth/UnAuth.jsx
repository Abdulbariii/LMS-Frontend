import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const UnAuth = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return !isAuthenticated ? children : <Navigate to={"/"} replace />;
};

UnAuth.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UnAuth;
