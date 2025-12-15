import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://grant-genius-server-one.vercel.app",
});

const useAxios = () => {
  return axiosSecure;
};

export default useAxios;
