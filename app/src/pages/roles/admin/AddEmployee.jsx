import { useState } from "react";
import { toast } from "react-toastify";
import { configureAuthenticatedRequest } from "../../common/utils";

export default function AddEmployee() {
  const [role, setRole] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDep] = useState("");
  const [job_title, setjobTitle] = useState("");
  const [joined, setJoined] = useState("");
  const [waitMessage, setWaitMessage] = useState(false);

  const request = configureAuthenticatedRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //verify input
    if (first_name.length < 3 || last_name < 3) {
      toast.error("Name is too short!");
      return;
    }
    const payload = {
      role,
      first_name,
      last_name,
      email,
      status,
      department,
      job_title,
      joined,
    };

    request
      .post("/admin/reg_employee", payload)
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
      className="bg-gray-800 p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h3 className="text-xl font-semibold mb-6 text-white">
        Please fill the form to add new employee
      </h3>

      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-2">
          Select role:{" "}
        </label>
        <select
          className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 py-2 px-3 text-white"
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
        <label className="block text-gray-300 font-medium mb-2">
          First name
        </label>
        <input
          className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 py-2 px-3 text-white"
          type="text"
          pattern="[A-Za-z]+"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-2">
          Last name
        </label>
        <input
          className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 py-2 px-3 text-white"
          type="text"
          pattern="[A-Za-z]+"
          title="Name can only contain letters."
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-2">Email</label>
        <input
          className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 py-2 px-3 text-white"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 font-medium mb-2">
          Select status:{" "}
        </label>
        <select
          className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 py-2 px-3 text-white"
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
        <label className="block text-gray-300 font-medium mb-2">
          Select department:{" "}
        </label>
        <select
          className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 py-2 px-3 text-white"
          onChange={(e) => setDep(e.target.value)}
          value={department}
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
        <label className="block text-gray-300 font-medium mb-2">
          Select job title:{" "}
        </label>
        <select
          className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 py-2 px-3 text-white"
          onChange={(e) => setjobTitle(e.target.value)}
          value={job_title}
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
        <label className="block text-gray-300 font-medium mb-2">Joined</label>
        <input
          className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 py-2 px-3 text-white"
          type="date"
          value={joined}
          onChange={(e) => setJoined(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-2 px-4 rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        {waitMessage ? "Adding employee..." : "Add Employee"}
      </button>
    </form>
  );
}
