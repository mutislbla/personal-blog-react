import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginRoute = ({ children }) => {
  const isUserLoggedIn = Cookies.get("token") !== undefined;

  if (!isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default LoginRoute;
