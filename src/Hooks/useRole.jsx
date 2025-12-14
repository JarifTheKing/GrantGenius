import { useEffect, useState } from "react";
import useAxiosSecure from "./UseAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users?email=${user.email}`).then((res) => {
        setRole(res.data[0]?.role);
        setRoleLoading(false);
      });
    }
  }, [user, axiosSecure]);

  return { role, roleLoading };
};

export default useRole;
