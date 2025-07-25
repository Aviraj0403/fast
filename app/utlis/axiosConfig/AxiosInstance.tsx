import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://13.127.161.91/api",
  // baseURL: "http://localhost:4021/api",

});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const requestUrl = error.config.url || "";

      if (
        error.response.status === 401 &&
        !requestUrl.includes("/auth/signin")
      ) {
        // Instead of redirecting here, we just return a special flag
        return Promise.reject({ isAuthError: true });
      }

      if (error.response.status === 403) {
        alert("You do not have permission to access this resource.");
      }
    }

    return Promise.reject(error);
  }
);
