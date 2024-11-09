//main app component
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./pages/roles/admin/AdminLayout";
import EmployeeLayout from "./pages/roles/employees/EmployeeLayout";
import Register from "./pages/auth/Register";
import Home from "./pages/publicPages/Home";
import PublicNavBar from "./pages/publicPages/PublicNavBar";
import ResetPassword from "./pages/auth/ResetPassword";

export default function App() {
  const location = useLocation();
  const publicRoutes = ["/", "/login", "/register", "/reset_password"];

  return (
    <>
      {publicRoutes.includes(location.pathname) && <PublicNavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/employee/*" element={<EmployeeLayout />} />
      </Routes>
      <ToastContainer position="top-center" limit={3} autoClose={3000} />
    </>
  );
}
