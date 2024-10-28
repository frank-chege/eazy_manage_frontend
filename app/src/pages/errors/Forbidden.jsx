//forbidden access page

import { useNavigate } from "react-router-dom";

export default function Forbidden({ previousPage }) {
  const navigate = useNavigate();
  const goToPreviousPage = () => {
    navigate(previousPage);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-600 text-white p-10 rounded-lg shadow-md w-full max-w-xl text-center">
        <h2 className="text-4xl font-bold mb-6">403 - Forbidden</h2>
        <p className="text-lg mb-4">
          Sorry, you don't have permission to access this page.
        </p>
        <hr className="border-gray-300 mb-4" />
        <p className="text-sm mb-6">
          If you believe this is a mistake, please contact support.
        </p>
        <div className="space-x-4">
          <button
            onClick={goToPreviousPage}
            className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            Go back to the previous page
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            Or log in
          </button>
        </div>
      </div>
    </div>
  );
}
