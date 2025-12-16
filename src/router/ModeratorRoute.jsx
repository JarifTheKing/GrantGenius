import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (user && (role === "moderator" || role === "admin")) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ModeratorRoute;
