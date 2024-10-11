import axios from "axios";

//extract csrf token from cookie
export function extractTokenFromCookie() {
  console.log(document.cookie);
}

//configures request
export function configureRequest() {
  const axiosRequest = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
  });
  return axiosRequest;
}
