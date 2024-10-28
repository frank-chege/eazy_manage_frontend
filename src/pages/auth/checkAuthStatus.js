//check the authentication status
import { configureRequest } from "../common/utils";
import { useGlobalContext } from "./GlobalContext";

export function checkAuthStatus() {
  const request = configureAuthenticatedRequest();
  const { email, role } = useGlobalContext();
  const payload = { email, role };
  try {
    request.get("/auth/auth_status", JSON.stringify(payload));
    return true;
  } catch (error) {
    return false;
  }
}
