import Logout from "../../auth/Logout";
import { Routes, Route } from "react-router-dom";
import useCheckAuthStatus from "../../auth/authCheck";
import AdminNavbar from "./AdminNavBar";
import AdminHome from "./AdminHome";
import Forbidden from "../../errors/Forbidden";

export default function AdminLayout({ children }) {
  const { checkingAuthStatus, isAuthenticated } = useCheckAuthStatus("admin");

  if (checkingAuthStatus) {
    return <div>Checking your authentication status. Please wait...</div>;
  }
  if (!checkingAuthStatus && !isAuthenticated) {
    return <Forbidden />;
  }

  return (
    <>
      {children}
      <AdminNavbar />
      <Routes>
        <Route path="/home" element={<AdminHome />} />
        <Route path="/logout" element={<Logout role="admin" />} />
      </Routes>
    </>
  );
}
