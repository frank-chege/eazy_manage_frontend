//main app component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./pages/roles/admin/AdminLayout";
import AuthorLayout from "./pages/roles/authors/AuthorLayout";
import Register from "./pages/auth/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/author/*" element={<AuthorLayout />} />
      </Routes>
      <ToastContainer position="top-center" limit={3} autoClose={3000} />
    </Router>
  );
}
