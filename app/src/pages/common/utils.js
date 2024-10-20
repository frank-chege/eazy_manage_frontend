import axios from "axios";

// Extract value from a specific cookie by name
export const getCookieValue = (name) => {
  const cookieValues = `; ${document.cookie}`;
  const parts = cookieValues.split(`; ${name}=`);

  if (parts.length === 2) {
    // Extract the value and handle the case where additional cookie data follows
    const value = parts.pop().split(";").shift().trim();
    return value;
  }
  return null;
};

//configures unauthenticated request
export function configureRequest() {
  axios.defaults.withCredentials = true;
  const axiosRequest = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000,
  });
  return axiosRequest;
}

//configures auth request
export function configureAuthenticatedRequest() {
  const csrf_access_token = getCookieValue("csrf_access_token");
  axios.defaults.withCredentials = true;
  const axiosRequest = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrf_access_token,
    },
    timeout: 5000,
  });
  return axiosRequest;
}
