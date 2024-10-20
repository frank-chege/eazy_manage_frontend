//check authentication status
import { useEffect, useState } from "react";
import { configureRequest, getCookieValue } from "../common/utils";
import { useNavigate } from "react-router-dom";

const useCheckAuthStatus = (role = "") => {
  const request = configureRequest();
  const csrf_access_token = getCookieValue("csrf_access_token");
  const payload = { role };
  const navigate = useNavigate();
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await request.post("/auth/auth_status", payload, {
          headers: {
            "X-CSRF-TOKEN": csrf_access_token,
          },
        });
        return response.data && response.data.status === "true";
      } catch (error) {
        // console.log("Authentication failed");
        // console.log(error);
        return false;
      }
    };

    const checkStatus = async () => {
      const authenticated = await authCheck();
      if (authenticated) {
        setIsAuthenticated(true);
      }
      setCheckingAuthStatus(false);
    };
    checkStatus();
  }, [navigate, request, csrf_access_token]);

  return { checkingAuthStatus, isAuthenticated };
};
export default useCheckAuthStatus;
