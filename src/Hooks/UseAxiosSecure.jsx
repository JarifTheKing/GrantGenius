// import axios from "axios";
// import useAuth from "./UseAuth";
// import { useNavigate } from "react-router";
// import { useEffect } from "react";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000",
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
