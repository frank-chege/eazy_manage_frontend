//hospital layout
import { Route, Routes } from "react-router-dom";
import { checkAuthStatus } from "../../auth/checkAuthStatus";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HospitalHome from "./HospitalHome";
import HospitalNavBar from "./HospitalNavBar";

export default function HospitalLayout() {
  const navigate = useNavigate();
  if (!checkAuthStatus) {
    toast("Permission denied! Please login to continue");
    navigate("/login");
  }
  return (
    <>
      <Routes>
        <HospitalNavBar />
        <Route path="/home" element={HospitalHome} />
      </Routes>
      ;
    </>
  );
}
