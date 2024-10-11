//main app component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./pages/auth/GlobalContext";
import NavBar from "./pages/common/NavBar";
import LandingPage from "./pages/common/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Booking from "./pages/common/Booking";
import BuyMeds from "./pages/common/BuyMeds";
import PatientLayout from "./pages/roles/Patient/PatientLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HospitalLayout from "./pages/roles/Hospital/HospitalLayout";

export default function App() {
  const { role } = useGlobalContext();
  return (
    <Router>
      <ToastContainer position="top-center" limit={3} />
      {role === "pubic" ? <NavBar /> : ""}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/buyMeds" element={<BuyMeds />} />
        <Route path="/patient/*" element={<PatientLayout />} />
        <Route path="/hospital/*" element={<HospitalLayout />} />
      </Routes>
    </Router>
  );
}
