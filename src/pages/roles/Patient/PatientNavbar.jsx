//doctor portal navigation bar
import { Link } from "react-router-dom";

function PatientNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/patient/home">
          Home
        </Link>
        <Link className="navbar-brand" to="/patient/booking">
          Booking
        </Link>
        <Link className="navbar-brand" to="/patient/buyMeds">
          Buy medicine
        </Link>
        <Link className="navbar-brand" to="/patient/records">
          Medical records
        </Link>
        <Link className="navbar-brand" to="/patient/logout">
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default PatientNavbar;
