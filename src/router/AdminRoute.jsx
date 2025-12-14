import { Navigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return null;

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/" />;
};

export default AdminRoute;
