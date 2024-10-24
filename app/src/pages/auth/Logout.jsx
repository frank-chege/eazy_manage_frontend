import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { configureRequest } from "../common/utils";
import { toast } from "react-toastify";
import useCheckAuthStatus from "./authCheck";
import { getCookieValue } from "../common/utils";

export default function Logout({ role }) {
  const navigate = useNavigate();
  const request = configureRequest();
  const { checkingAuthStatus, isAuthenticated } = useCheckAuthStatus(role);
  const csrf_access_token = getCookieValue("csrf_access_token");

  useEffect(() => {
    console.log(csrf_access_token);
    const sendLogoutRequest = async () => {
      try {
        const response = await request.post(
          "/auth/logout",
          {},
          {
            headers: {
              "X-CSRF-TOKEN": csrf_access_token,
            },
          }
        );
        return response.data && response.data.status === "true";
      } catch (error) {
        return false;
      }
    };

    const logout = async () => {
      const logoutStatus = await sendLogoutRequest();
      console.log(logoutStatus);
      //failed logout
      if (!logoutStatus) {
        toast.error("Logout failed!");
      } else {
        toast.success("Logged out successfully");
        navigate("/");
      }
    };
    //send logout request
    if (!checkingAuthStatus && isAuthenticated) {
      logout();
    }
    if (!checkingAuthStatus && !isAuthenticated) {
      toast.error("Logout failed!");
    }
  }, [role, navigate, checkingAuthStatus, isAuthenticated]);

  return null;
}
