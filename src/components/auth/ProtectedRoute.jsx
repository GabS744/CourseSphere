import { useAuth } from "../../contexts/AuthContext.jsx";

import { Navigate, Outlet, useOutletContext } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  const context = useOutletContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet context={context} />;
}

export default ProtectedRoute;
