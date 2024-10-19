import { Link } from "react-router-dom";

export default function EmployeeNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/employee/tasks">
          Tasks
        </Link>
        <Link className="navbar-brand" to="/employee/messages">
          Messages
        </Link>
        <Link className="navbar-brand" to="/author/logout">
          Logout
        </Link>
      </div>
    </nav>
  );
}
