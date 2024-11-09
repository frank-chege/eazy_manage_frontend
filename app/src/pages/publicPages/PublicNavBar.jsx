import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to={`/`}>
          <img src="/logo.png" alt="Logo" className="h-10 w-30 mr-4" />
        </Link>
      </div>

      {/* Links Section */}
      <div className="flex justify-end">
        <Link className="mx-4 p-2 hover:text-gray-300" to={`/`}>
          Home
        </Link>
        <Link className="mx-4 p-2 hover:text-gray-300" to={`/`}>
          Services
        </Link>
        <Link className="mx-4 p-2 hover:text-gray-300" to={`/`}>
          About
        </Link>
        <Link className="mx-4 p-2 hover:text-gray-300" to={`/`}>
          Contact us
        </Link>
        <Link className="mx-4 p-2 hover:text-gray-300" to={`/login`}>
          Login
        </Link>
      </div>
    </nav>
  );
};
export default PublicNavbar;
