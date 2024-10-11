//logout and clear auth tokens
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import { useEffect } from "react";
import { configureRequest } from "../common/utils";

export default function Logout() {
  const { role, setRole } = useGlobalContext();
  const navigate = useNavigate();
  const request = configureRequest();
  //set role to public
  setRole("public");
  useEffect(() => {
    setRole("public");
    navigate("/");
  }, [authStatus, role]);
}
