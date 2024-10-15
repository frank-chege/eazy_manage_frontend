import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin/tasks">
          Tasks
        </Link>
        <Link className="navbar-brand" to="/admin/employees">
          Employees
        </Link>
        <Link className="navbar-brand" to="/admin/messages">
          Messages
        </Link>
        <Link className="navbar-brand" to="/admin/logout">
          Logout
        </Link>
      </div>
    </nav>
  );
}
