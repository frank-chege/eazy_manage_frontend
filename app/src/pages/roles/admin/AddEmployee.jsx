import { useState } from "react";
import { toast } from "react-toastify";
import { configureAuthenticatedRequest } from "../../common/utils";

export default function AddEmployee() {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [dep, setDep] = useState("");
  const [jobTitle, setjobTitle] = useState("");
  const [joined, setJoined] = useState("");
  const [waitMessage, setWaitMessage] = useState(false);

  const request = configureAuthenticatedRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //verify input
    if (firstName.length < 3 || lastName < 3) {
      toast.error("Name is too short!");
      return;
    }
    const payload = {
      role,
      firstName,
      lastName,
      email,
      status,
      dep,
      jobTitle,
      joined,
    };

    request
      .post("/auth/register", payload)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occured. Please try again");
        }
        setWaitMessage(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        Please fill the form to add new employee
      </h3>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select role:{" "}
        </label>
        <select
          className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2 px-3"
          onChange={(e) => setRole(e.target.value)}
          value={role}
          required
        >
          <option value="" disabled>
            --select role--
          </option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          First name
        </label>
        <input
          className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2 px-3"
          type="text"
          pattern="[A-Za-z]+"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Last name
        </label>
        <input
          className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2 px-3"
          type="text"
          pattern="[A-Za-z]+"
          title="Name can only contain letters."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2 px-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select status:{" "}
        </label>
        <select
          className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2 px-3"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          required
        >
          <option value="" disabled>
            --select status--
          </option>
          <option value="active">Active</option>
          <option value="leave">On leave</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select department:{" "}
        </label>
        <select
          className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2 px-3"
          onChange={(e) => setDep(e.target.value)}
          value={dep}
          required
        >
          <option value="" disabled>
            --select department--
          </option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="ACCOUNTS">Accounts</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select job title:{" "}
        </label>
        <select
          className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2 px-3"
          onChange={(e) => setjobTitle(e.target.value)}
          value={jobTitle}
          required
        >
          <option value="" disabled>
            --select job title--
          </option>
          <option value="accountant">Accountant</option>
          <option value="hr">Hr</option>
          <option value="developer">Developer</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Joined</label>
        <input
          className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2 px-3"
          type="date"
          value={joined}
          onChange={(e) => setJoined(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        {waitMessage ? "Adding employee..." : "Add Employee"}
      </button>
    </form>
  );
}
