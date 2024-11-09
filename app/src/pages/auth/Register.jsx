import { useState } from "react";
import { toast } from "react-toastify";
import { configureRequest } from "../common/utils";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [orgData, setOrgData] = useState({
    name: "",
    email: "",
    totalemployees: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const request = configureRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orgData.name.length < 3 || orgData.address.length < 3) {
      toast.error("Name or address is too short!");
      return;
    }
    if (orgData.totalemployees < 1) {
      toast.error("Employees total should be more than 1");
      return;
    }

    const payload = { ...orgData };
    setLoading(true);
    try {
      const res = await request.post("/auth/register/org", payload);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-95">
      {/* Very dark page background */}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 bg-opacity-90 p-6 rounded-md shadow-md max-w-md w-full mx-4"
      >
        {/* Form with dark gray background blending with page */}

        <h3 className="text-gray-300 text-center mb-4 text-lg font-semibold">
          Register Your Organization
        </h3>

        <div className="mb-3">
          <label className="block text-gray-400 font-medium mb-1">
            Organization name
          </label>
          <input
            className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
            type="text"
            pattern="[A-Za-z\s]+"
            value={orgData.name}
            onChange={(e) =>
              setOrgData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="e.g., XYZ Company"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-400 font-medium mb-1">Email</label>
          <input
            className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
            type="email"
            value={orgData.email}
            onChange={(e) =>
              setOrgData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="e.g., businessname@gmail.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-400 font-medium mb-1">
            Number of employees
          </label>
          <input
            className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
            type="number"
            min="1"
            value={orgData.totalemployees}
            onChange={(e) =>
              setOrgData((prev) => ({
                ...prev,
                totalemployees: e.target.value,
              }))
            }
            placeholder="e.g., 10"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-400 font-medium mb-1">
            Business address
          </label>
          <input
            className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
            type="text"
            pattern="[A-Za-z\s]+"
            value={orgData.address}
            onChange={(e) =>
              setOrgData((prev) => ({ ...prev, address: e.target.value }))
            }
            placeholder="e.g., Ngong road, Nairobi, Kenya"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-700 text-gray-300 py-2 px-3 rounded-md hover:bg-gray-600 transition duration-200 font-medium mt-4"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-500 text-sm text-center mt-5">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-gray-400 hover:text-gray-200 underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
