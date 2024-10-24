import AddEmployee from "./AddEmployee";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import GetEmployees from "./GetEmployees";

export default function Employees() {
  const location = useLocation;
  // Determine if the current path is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="flex justify-center items-center py-6 px-4">
        <nav className="flex justify-between w-full max-w-md space-x-4">
          <Link
            to="/admin/employees/overview"
            className={`px-4 py-2 rounded-lg flex items-center justify-between ${
              isActive("/admin/employees/overview")
                ? "bg-black text-red-700 font-bold"
                : "bg-gray-900 text-white"
            } hover:bg-black hover:text-white transition duration-200`}
          >
            Overview
          </Link>
          <Link
            to="/admin/employees/add_new"
            className={`px-4 py-2 rounded-lg flex items-center justify-between ${
              isActive("/admin/employees/add_new")
                ? "bg-black text-red-700 font-bold"
                : "bg-gray-900 text-white"
            } hover:bg-black hover:text-white transition duration-200`}
          >
            Add new
          </Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="overview" />} />
        <Route path="/overview" element={<GetEmployees />} />
        <Route path="/add_new" element={<AddEmployee />} />
      </Routes>
    </>
  );
}
