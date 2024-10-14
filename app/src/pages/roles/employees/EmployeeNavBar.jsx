import { Link } from "react-router-dom";

export default function EmployeeNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/author/home">
          Home
        </Link>
        <Link className="navbar-brand" to="/author/logout">
          Logout
        </Link>
      </div>
    </nav>
  );
}
