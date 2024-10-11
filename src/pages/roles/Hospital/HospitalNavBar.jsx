//doctor portal navigation bar
import { Link } from "react-router-dom";

function HospitalNavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/hospital/home">
          Home
        </Link>
      </div>
    </nav>
  );
}

export default HospitalNavBar;
