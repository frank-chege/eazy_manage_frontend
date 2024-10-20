import Logout from "../../auth/Logout";
import { Routes, Route } from "react-router-dom";
import useCheckAuthStatus from "../../auth/authCheck";
import Forbidden from "../../errors/Forbidden";
import EmployeeNavbar from "./EmployeeNavBar";
import EmployeeMessages from "./EmployeeMessages";
import TasksLayout from "../../tasks/TasksLayout";

export default function EmployeeLayout({ children }) {
  const { checkingAuthStatus, isAuthenticated } = useCheckAuthStatus("author");

  if (!checkingAuthStatus && !isAuthenticated) {
    return <Forbidden />;
  }
  return (
    <>
      {children}
      <EmployeeNavbar />
      <Routes>
        <Route path="/tasks/*" element={<TasksLayout role="employee" />} />
        <Route path="/messages" element={<EmployeeMessages />} />
        <Route path="/logout" element={<Logout role="employee" />} />
      </Routes>
    </>
  );
}
