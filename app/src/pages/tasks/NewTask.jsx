import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { configureAuthenticatedRequest } from "../common/utils";
import { useFetchEmployeeContext } from "../contexts/FetchEmployeesContext";

export default function NewTask({ role }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [started, setStarted] = useState("");
  const [toEnd, setToEnd] = useState("");
  const [priority, setPriority] = useState("");
  const [waitMessage, setWaitMessage] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate();
  //get employees hook
  const {
    fetchEmployees,
    setFetchEmployees,
    employeesData,
    setEmployeePagination,
  } = useFetchEmployeeContext();
  const request = configureAuthenticatedRequest();

  //fetch employees
  useEffect(() => {
    setFetchEmployees(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //verify input
    if (taskName.length < 5) {
      toast.error("Task name is too short!");
      return;
    }
    const payload = {
      taskName,
      description,
      started,
      toEnd,
      priority,
    };
    role === "admin" ? (payload["employeeId"] = employeeId) : null;

    request
      .post("/tasks/new_task", payload)
      .then((res) => {
        toast.success(res.data.message);
        navigate(`/${role}/tasks/pending`);
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
      className="bg-black p-6 rounded-md shadow-md max-w-lg mx-auto"
    >
      <h3 className="text-white bg-gray-800 py-2 px-4 text-center font-medium text-lg mb-6 rounded-md">
        Fill the details below to add a new task
      </h3>

      <div className="mb-4">
        <label className="block text-gray-400 font-medium mb-1">
          Task name
        </label>
        <input
          className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task name e.g. fixing bugs on backend"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-400 font-medium mb-1">
          Task description
        </label>
        <textarea
          className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add detailed task description"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-400 font-medium mb-1">
          Starting date
        </label>
        <input
          className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
          type="datetime-local"
          value={started}
          onChange={(e) => setStarted(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-400 font-medium mb-1">
          Planned end date
        </label>
        <input
          className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
          type="date"
          value={toEnd}
          onChange={(e) => setToEnd(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-400 font-medium mb-1">
          Task priority
        </label>
        <select
          className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
          required
        >
          <option value="" disabled>
            --select priority--
          </option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {role === "admin" && (
        <div className="mb-4">
          <label className="block text-gray-400 font-medium mb-1">
            Assign task to:
          </label>
          <select
            className="block w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
            onChange={(e) => setEmployeeId(e.target.value)}
            value={employeeId}
            required
          >
            <option value="" disabled>
              --select employee--
            </option>
            {employeesData ? (
              employeesData.map((employee, index) => (
                <option key={index} value={employee.user_id}>
                  {employee.first_name} {employee.last_name}
                </option>
              ))
            ) : (
              <option value="">
                {fetchEmployees ? "Loading employees" : "No employees found"}
              </option>
            )}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 flex justify-center items-center"
      >
        {waitMessage ? (
          "Adding task..."
        ) : (
          <>
            <span className="mr-2">➕</span>Add new task
          </>
        )}
      </button>
    </form>
  );
}
