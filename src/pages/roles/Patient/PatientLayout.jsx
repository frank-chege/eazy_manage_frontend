//patient layout
import PatientNavbar from "./PatientNavbar";
import PatientHome from "./PatientHome";
import Logout from "../../common/Logout";
import MedicalRecords from "./PatientMedicalRecords";
import BuyMeds from "../../common/BuyMeds";
import Booking from "../../common/Booking";
import { useGlobalContext } from "../../auth/GlobalContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkAuthStatus } from "../../auth/checkAuthStatus";
import { toast } from "react-toastify";

export default function PatientLayout({ children }) {
  const { authStatus } = useGlobalContext();
  const navigate = useNavigate();

  //check status status
  if (!checkAuthStatus) {
    toast("Permission denied! Please login to continue");
    navigate("/login");
  }

  return (
    <>
      <PatientNavbar />
      <Routes>
        <Route path="/home" element={<PatientHome />} />
        <Route path="/records" element={<MedicalRecords />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/buyMeds" element={<BuyMeds />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </>
  );
}
