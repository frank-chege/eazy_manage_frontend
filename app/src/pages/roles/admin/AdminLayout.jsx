import Logout from "../../auth/Logout";
import { Routes, Route } from "react-router-dom";
import useCheckAuthStatus from "../../auth/authCheck";
import AdminNavbar from "./AdminNavBar";
import Forbidden from "../../errors/Forbidden";
import Employees from "./Employees";
import AdminMessages from "./AdminMessages";
import TasksLayout from "../../tasks/TasksLayout";

export default function AdminLayout({ children }) {
  const { checkingAuthStatus, isAuthenticated } = useCheckAuthStatus("admin");

  if (!checkingAuthStatus && !isAuthenticated) {
    return <Forbidden />;
  }

  return (
    <>
      {children}
      <AdminNavbar />
      <Routes>
        <Route path="/tasks/*" element={<TasksLayout role="admin" />} />
        <Route path="/employees/*" element={<Employees />} />
        <Route path="/messages/*" element={<AdminMessages />} />
        <Route path="/logout" element={<Logout role="admin" />} />
      </Routes>
    </>
  );
}
