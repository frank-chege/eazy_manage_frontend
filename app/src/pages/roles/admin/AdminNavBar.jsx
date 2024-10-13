import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin/home">
          Home
        </Link>
        <Link className="navbar-brand" to="/admin/logout">
          Logout
        </Link>
      </div>
    </nav>
  );
}
