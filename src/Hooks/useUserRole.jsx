import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./UseAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email || loading) return;

    axiosSecure
      .get(`/users?email=${user.email}`)
      .then((res) => {
        setRole(res.data[0]?.role || "student");
        setRoleLoading(false);
      })
      .catch(() => setRoleLoading(false));
  }, [user, loading, axiosSecure]);

  return { role, roleLoading };
};

export default useUserRole;
