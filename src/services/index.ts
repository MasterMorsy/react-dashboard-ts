import axios from "axios";
import { admin } from "../helpers/users";

const endPoint = axios;

endPoint.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:28925/api"
    : "https://production-url.com/api";

// Add a request interceptor
endPoint.interceptors.request.use(function (request) {
  if (window.location.href.includes("/admin") && admin.isLogged())
    request.headers["Authorization"] = `Bearer ${admin.get("token")}`;

  return request;
});
// Add a response interceptor
endPoint.interceptors.response.use(
  function (response) {
    if (response.data.admin) {
      admin.update(response.data.admin);
    }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default endPoint;
