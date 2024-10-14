import Logout from "../../auth/Logout";
import { Routes, Route } from "react-router-dom";
import useCheckAuthStatus from "../../auth/authCheck";
import Forbidden from "../../errors/Forbidden";
import EmployeeNavbar from "./EmployeeNavBar";
import EmployeeHome from "./EmployeeHome";

export default function EmployeeLayout({ children }) {
  const { checkingAuthStatus, isAuthenticated } = useCheckAuthStatus("author");

  if (checkingAuthStatus) {
    return <div>Checking your authentication status. Please wait...</div>;
  }
  if (!checkingAuthStatus && !isAuthenticated) {
    return <Forbidden />;
  }
  return (
    <>
      {children}
      <EmployeeNavbar />
      <Routes>
        <Route path="/home" element={<EmployeeHome />} />
        <Route path="/logout" element={<Logout role="author" />} />
      </Routes>
    </>
  );
}
