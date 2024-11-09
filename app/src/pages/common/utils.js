import axios from "axios";
import Cookies from "js-cookie";

//configures unauthenticated request
export function configureRequest() {
  const url = import.meta.env.VITE_BASE_URL;
  axios.defaults.withCredentials = true;
  const axiosRequest = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000,
  });
  return axiosRequest;
}

//configures auth request
export function configureAuthenticatedRequest() {
  const url = import.meta.env.VITE_BASE_URL;
  const csrf_access_token = Cookies.get("csrf_token");
  axios.defaults.withCredentials = true;
  const axiosRequest = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrf_access_token,
    },
    timeout: 5000,
  });
  return axiosRequest;
}
