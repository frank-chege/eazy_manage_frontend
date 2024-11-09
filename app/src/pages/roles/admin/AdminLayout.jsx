import Logout from "../../auth/Logout";
import { Routes, Route } from "react-router-dom";
import useCheckAuthStatus from "../../auth/authCheck";
import Forbidden from "../../errors/Forbidden";
import Employees from "./Employees";
import AdminMessages from "./AdminMessages";
import TasksLayout from "../../tasks/TasksLayout";
import PrivateNavbar from "../../common/PrivateNavBar";
import ResetPassword from "../../auth/ResetPassword";

export default function AdminLayout({ children }) {
  const { checkingAuthStatus, isAuthenticated } = useCheckAuthStatus("admin");

  if (!checkingAuthStatus && !isAuthenticated) {
    return <Forbidden />;
  }

  return (
    <>
      {children}
      <PrivateNavbar role="admin" />
      <Routes>
        <Route path="/tasks/*" element={<TasksLayout role="admin" />} />
        <Route path="/employees/*" element={<Employees />} />
        <Route path="/messages/*" element={<AdminMessages role="admin" />} />
        <Route path="/logout" element={<Logout role="admin" />} />
        <Route path="/reset_password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}
