import Logout from "../../auth/Logout";
import { Routes, Route } from "react-router-dom";
import useCheckAuthStatus from "../../auth/authCheck";
import Forbidden from "../../errors/Forbidden";
import EmployeeNavbar from "./EmployeeNavBar";
import EmployeeTasks from "./EmployeeTasks";
import EmployeeMessages from "./EmployeeMessages";

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
        <Route path="/tasks" element={<EmployeeTasks />} />
        <Route path="/messages" element={<EmployeeMessages />} />
        <Route path="/logout" element={<Logout role="employee" />} />
      </Routes>
    </>
  );
}
