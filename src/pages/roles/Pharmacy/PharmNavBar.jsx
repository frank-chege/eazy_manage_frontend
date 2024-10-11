//doctor portal navigation bar
import { Link } from "react-router-dom";

function PharmacyNavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/pharmacy/home">
          Home
        </Link>
      </div>
    </nav>
  );
}

export default PharmacyNavBar;
