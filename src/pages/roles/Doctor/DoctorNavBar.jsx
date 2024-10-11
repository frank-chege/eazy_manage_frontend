//doctor portal navigation bar
import { Link } from "react-router-dom";

function DoctorNavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/doctor/home">
          Home
        </Link>
      </div>
    </nav>
  );
}

export default DoctorNavBar;
