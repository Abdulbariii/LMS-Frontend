/* eslint-disable react/prop-types */
import { Component, createContext } from "react";

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
  };
  toggleAuth = () => {
    this.setState({ isAuthenticated: !this.state.isAuthenticated });
  };
  render() {
    return (
      <AuthContext.Provider
        value={{ ...this.state, toggleAuth: this.toggleAuth }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
