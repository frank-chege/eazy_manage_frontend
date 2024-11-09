import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function PrivateNavbar({ role }) {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  };
  const toggleShowPrompt = () => {
    setShowPrompt(!showPrompt);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to={`/${role}/tasks`}>
          <img src="/logo.png" alt="Logo" className="h-10 w-30 mr-4" />
        </Link>
      </div>

      {/* Links Section */}
      <div className="flex justify-end">
        <Link className="mx-4 p-2 hover:text-gray-300" to={`/${role}/tasks`}>
          Tasks
        </Link>
        {role === "admin" && (
          <Link className="mx-4 p-2 hover:text-gray-300" to="/admin/employees">
            Employees
          </Link>
        )}
        <Link className="mx-4 p-2 hover:text-gray-300" to={`/${role}/messages`}>
          Messages
        </Link>

        {/* User Icon - Toggles the Side Menu */}
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleSideMenu}
        >
          <img
            src="/user.png"
            alt="User Icon"
            className="h-5 w-5 rounded-full"
          />
        </div>

        {/* Side Menu */}
        {showSideMenu && (
          <div className="absolute top-0 right-0 bg-black text-white p-6 shadow-lg w-[300px] h-auto z-20">
            {/* Close button styled and positioned on the right */}
            <button
              onClick={toggleSideMenu}
              className="absolute top-4 right-4 text-xl text-gray-300 transition duration-200"
            >
              ✕
            </button>

            {/* Side Menu Links */}
            <span
              className="block mx-4 p-2 hover:text-gray-300 cursor-pointer"
              onClick={() => {
                toggleShowPrompt();
                toggleSideMenu();
              }}
            >
              Change password
            </span>
            <Link
              className="block mx-4 p-2 hover:text-gray-300"
              to={`/${role}/logout`}
              onClick={toggleSideMenu}
            >
              Logout
            </Link>
          </div>
        )}

        {/* Password Reset Prompt Overlay */}
        {showPrompt && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-30">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-1/2 h-auto relative">
              {/* Close button styled and positioned on the right */}
              <button
                onClick={toggleShowPrompt}
                className="absolute top-4 right-4 text-xl text-gray-300 transition duration-200"
              >
                ✕
              </button>

              <h2 className="text-m font-regular mb-4 text-center">
                To change your password, a code will be sent to the email
                associated with your account to verify it's you. Press continue
                to proceed
              </h2>

              <button
                type="submit"
                className="bg-gray-700 text-gray-300 m-2 my-5 p-2.5 rounded-md hover:bg-gray-600 transition duration-200 w-[280px] font-medium"
                onClick={() => {
                  navigate(`/${role}/reset_password`, {
                    state: { initialStep: 2, initialPath: location.pathname },
                  });
                  toggleShowPrompt();
                }}
              >
                Continue
              </button>
              <button
                type="button"
                onClick={toggleShowPrompt}
                className="bg-gray-700 text-gray-300 m-2 p-2.5 rounded-md hover:bg-gray-600 transition duration-200 w-[280px] font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
