import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="flex justify-end p-4 bg-black text-white">
      <Link className="mx-4 p-2 hover:text-gray-300" to="/admin/tasks">
        Tasks
      </Link>
      <Link className="mx-4 p-2 hover:text-gray-300" to="/admin/employees">
        Employees
      </Link>
      <Link className="mx-4 p-2 hover:text-gray-300" to="/admin/messages">
        Messages
      </Link>
      <Link className="mx-4 p-2 hover:text-gray-300" to="/admin/logout">
        Logout
      </Link>
    </nav>
  );
}
