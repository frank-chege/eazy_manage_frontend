//main app component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./pages/roles/admin/AdminLayout";
import EmployeeLayout from "./pages/roles/employees/EmployeeLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/employee/*" element={<EmployeeLayout />} />
      </Routes>
      <ToastContainer position="top-center" limit={3} autoClose={3000} />
    </Router>
  );
}
