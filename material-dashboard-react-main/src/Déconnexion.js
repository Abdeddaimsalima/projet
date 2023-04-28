import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Déconnexion = function () {
  const [authenticated, setAuthenticated] = useState(true);

  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    setAuthenticated(false);
  }

  return authenticated ? null : <Navigate to="/authentication/sign-in" />
};

export default Déconnexion;