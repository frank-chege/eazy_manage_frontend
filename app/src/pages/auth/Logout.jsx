import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { configureAuthenticatedRequest } from "../common/utils";
import { toast } from "react-toastify";
import useCheckAuthStatus from "./authCheck";
import Cookies from "js-cookie";

export default function Logout({ role }) {
  const navigate = useNavigate();
  const request = configureAuthenticatedRequest();
  const { checkingAuthStatus, isAuthenticated } = useCheckAuthStatus(role);

  useEffect(() => {
    const sendLogoutRequest = async () => {
      try {
        const response = await request.post("/auth/logout", {});
        return response.data && response.data.status === "true";
      } catch (error) {
        return false;
      }
    };

    const logout = async () => {
      const logoutStatus = await sendLogoutRequest();
      //failed logout
      if (!logoutStatus) {
        toast.error("Logout failed!");
      } else {
        toast.success("Logged out successfully");
        Cookies.remove("csrf_token");
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
