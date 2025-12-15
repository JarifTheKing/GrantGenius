// import axios from "axios";
// import useAuth from "./UseAuth";
// import { useNavigate } from "react-router";
// import { useEffect } from "react";

// const axiosInstance = axios.create({
//   baseURL: "https://grant-genius-server-one.vercel.app",
// });

// const useAxiosSecure = () => {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();

//   // set Token in the header
//   useEffect(() => {
//     // request interceptor
//     const requestInterceptor = axiosInstance.interceptors.request.use(
//       (config) => {
//         const token = user?.accessToken;
//         if (token) {
//           config.headers.authorization = `Bearer ${token}`;
//         }
//         return config;
//       }
//     );

//     // response interceptor
//     const responseInterceptor = axiosInstance.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         // const status = error?.response?.status;
//         // if (status === 401 || status === 403) {
//         //   // logOut().then(() => {
//         //   //   navigate("/register");
//         //   // });
//         //   console.log("Unauthorized — logging out...");
//         // }
//         console.log(error);
//       }
//     );
//     return () => {
//       axiosInstance.interceptors.request.eject(requestInterceptor);
//       axiosInstance.interceptors.response.eject(responseInterceptor);
//     };
//   }, [user, navigate, logOut]);

//   return axiosInstance;
// };

// export default useAxiosSecure;

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://grant-genius-server-one.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ================= REQUEST INTERCEPTOR =================
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ================= RESPONSE INTERCEPTOR =================
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          console.warn("Unauthorized — logging out");
          await logOut();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    // ================= CLEANUP =================
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user?.accessToken, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
