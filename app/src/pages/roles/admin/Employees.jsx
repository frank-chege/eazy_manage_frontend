import AddEmployee from "./AddEmployee";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import GetEmployees from "./GetEmployees";

export default function Employees() {
  return (
    <>
      <nav>
        <Link to="/admin/employees/overview">Overview</Link>
        <Link to="/admin/employees/add_new">Add new</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="overview" />} />
        <Route path="/overview" element={<GetEmployees />} />
        <Route path="/add_new" element={<AddEmployee />} />
      </Routes>
    </>
  );
}
