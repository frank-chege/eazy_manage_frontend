import Logout from "../../auth/Logout";
import { Routes, Route } from "react-router-dom";
import useCheckAuthStatus from "../../auth/authCheck";
import AdminNavbar from "./AdminNavBar";
import Forbidden from "../../errors/Forbidden";
import Employees from "./Employees";
import AdminTasks from "./AdminTasks";
import AdminMessages from "./AdminMessages";

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
        <Route path="/tasks/*" element={<AdminTasks />} />
        <Route path="/employees/*" element={<Employees />} />
        <Route path="/messages/*" element={<AdminMessages />} />
        <Route path="/logout" element={<Logout role="admin" />} />
      </Routes>
    </>
  );
}
