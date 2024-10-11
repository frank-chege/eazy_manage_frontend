//navigation bar
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <Link className="navbar-brand" to="/login">
          Login
        </Link>
        <Link className="navbar-brand" to="/booking">
          Book Consultation
        </Link>
        <Link className="navbar-brand" to="/buyMeds">
          Buy medicine
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
