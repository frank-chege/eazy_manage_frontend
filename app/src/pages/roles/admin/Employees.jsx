import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import ViewEmployees from "./ViewEmployees";
import { Routes, Route, Link } from "react-router-dom";

export default function Employees() {
  return (
    <>
      <nav>
        <Link to="/admin/employees/overview">Overview</Link>
        <Link to="/admin/employees/add_new">Add new</Link>
      </nav>
      <ViewEmployees />
      <Routes>
        <Route path="/overview" element={<ViewEmployees />} />
        <Route path="/add_new" element={<AddEmployee />} />
      </Routes>
    </>
  );
}
