/**
 * PROTECTED ROUTE
 * Wraps admin pages — redirects to login if not authenticated.
 *
 * 💡 LEARNING TIP: In a real app with Django JWT:
 * - Check if the JWT token exists in localStorage
 * - Optionally verify it hasn't expired (check the `exp` claim)
 * - In Flutter, you'd check SharedPreferences for the token
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/index.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login, passing the current location so we can redirect back after login
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
