import Logout from "../../auth/Logout";
import { Routes, Route } from "react-router-dom";
import useCheckAuthStatus from "../../auth/authCheck";
import Forbidden from "../../errors/Forbidden";
import EmployeeMessages from "./EmployeeMessages";
import TasksLayout from "../../tasks/TasksLayout";
import Navbar from "../../common/NavBar";

export default function EmployeeLayout({ children }) {
  const { checkingAuthStatus, isAuthenticated } = useCheckAuthStatus("author");

  if (!checkingAuthStatus && !isAuthenticated) {
    return <Forbidden />;
  }
  return (
    <>
      {children}
      <Navbar role="employee" />
      <Routes>
        <Route path="/tasks/*" element={<TasksLayout role="employee" />} />
        <Route path="/messages" element={<EmployeeMessages />} />
        <Route path="/logout" element={<Logout role="employee" />} />
      </Routes>
    </>
  );
}
