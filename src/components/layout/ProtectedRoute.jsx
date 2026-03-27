import { Navigate } from "react-router-dom";
import {
  canAccessFeature,
  getDefaultRouteForRole,
  isKnownRole,
} from "../../utils/roles";

export default function ProtectedRoute({ children, roles, featureKey }) {
  const storedUser = localStorage.getItem("user");
  const fallbackRole = localStorage.getItem("role");
  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const role = user?.role || fallbackRole;

  // Missing or invalid session - clear stale auth and redirect to login.
  if (!user || !role || !isKnownRole(role)) {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  if (featureKey && !canAccessFeature(role, featureKey)) {
    return <Navigate to={getDefaultRouteForRole(role)} replace />;
  }

  return children;
}
