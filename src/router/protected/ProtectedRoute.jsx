import { Navigate, useLocation } from "react-router";
import useAuth from "../../hook/useAuth";

/**
 * ProtectedRoute: 
 * Protects routes based on authentication and allowed roles
 * 
 * @param {ReactNode} children - The component to render
 * @param {string[]} allowedRoles - Roles allowed to access this route
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center py-10 text-lg font-semibold">Loading...</div>;
  }

  if(!user){
    return <Navigate to="/signIn"  state={{ from: location }}/>
}

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
