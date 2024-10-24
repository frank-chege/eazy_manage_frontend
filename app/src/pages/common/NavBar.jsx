import { Link } from "react-router-dom";

export default function Navbar({ role }) {
  return (
    <nav className="flex justify-end p-4 bg-black text-white">
      <Link className="mx-4 p-2 hover:text-gray-300" to={`/${role}/tasks`}>
        Tasks
      </Link>
      {role === "admin" ? (
        <Link className="mx-4 p-2 hover:text-gray-300" to="/admin/employees">
          Employees
        </Link>
      ) : null}
      <Link className="mx-4 p-2 hover:text-gray-300" to={`/${role}/messages`}>
        Messages
      </Link>
      <Link className="mx-4 p-2 hover:text-gray-300" to={`/${role}/logout`}>
        Logout
      </Link>
    </nav>
  );
}
