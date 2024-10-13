import Logout from "../../auth/Logout";
import { Routes, Route } from "react-router-dom";
import useCheckAuthStatus from "../../auth/authCheck";
import AuthorNavbar from "./AuthorNavBar";
import AuthorHome from "./AuthorHome";
import Forbidden from "../../errors/Forbidden";

export default function AuthorLayout({ children }) {
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
      <AuthorNavbar />
      <Routes>
        <Route path="/home" element={<AuthorHome />} />
        <Route path="/logout" element={<Logout role="author" />} />
      </Routes>
    </>
  );
}
