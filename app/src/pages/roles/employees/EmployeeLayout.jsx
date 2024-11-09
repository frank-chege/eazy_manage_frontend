import Logout from "../../auth/Logout";
import { Routes, Route, useLocation } from "react-router-dom";
import useCheckAuthStatus from "../../auth/authCheck";
import Forbidden from "../../errors/Forbidden";
import EmployeeMessages from "./EmployeeMessages";
import TasksLayout from "../../tasks/TasksLayout";
import PrivateNavbar from "../../common/PrivateNavBar";
import ResetPassword from "../../auth/ResetPassword";

export default function EmployeeLayout({ children }) {
  const { checkingAuthStatus, isAuthenticated } =
    useCheckAuthStatus("employee");

  if (!checkingAuthStatus && !isAuthenticated) {
    return <Forbidden />;
  }
  return (
    <>
      {children}
      <PrivateNavbar role="employee" />
      <Routes>
        <Route path="/tasks/*" element={<TasksLayout role="employee" />} />
        <Route
          path="/messages"
          element={<EmployeeMessages role="employee" />}
        />
        <Route path="/logout" element={<Logout role="employee" />} />
        <Route path="/reset_password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}
