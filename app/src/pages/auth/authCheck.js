//check authentication status
import { useEffect, useState } from "react";
import { configureAuthenticatedRequest } from "../common/utils";

const useCheckAuthStatus = (role = "") => {
  const request = configureAuthenticatedRequest();
  const payload = { role };
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await request.post("/auth/check_auth_status", payload);
        return response.data && response.data.status === "true";
      } catch (error) {
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
  }, []);

  return { checkingAuthStatus, isAuthenticated };
};
export default useCheckAuthStatus;
