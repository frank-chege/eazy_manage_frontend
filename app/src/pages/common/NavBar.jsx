import { Link } from "react-router-dom";

export default function Navbar({ role }) {
  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to={`/${role}/tasks`}>
          <img src="/dd.png" alt="Logo" className="h-10 w-30 mr-4" />
        </Link>
      </div>

      {/* Links Section */}
      <div className="flex justify-end">
        <Link className="mx-4 p-2 hover:text-gray-300" to={`/${role}/tasks`}>
          Tasks
        </Link>
        {role === "admin" && (
          <Link className="mx-4 p-2 hover:text-gray-300" to="/admin/employees">
            Employees
          </Link>
        )}
        <Link className="mx-4 p-2 hover:text-gray-300" to={`/${role}/messages`}>
          Messages
        </Link>
        <Link className="mx-4 p-2 hover:text-gray-300" to={`/${role}/logout`}>
          Logout
        </Link>
      </div>
    </nav>
  );
}
