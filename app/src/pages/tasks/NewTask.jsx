import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { configureAuthenticatedRequest } from "../common/utils";
import { useGlobalContext } from "../auth/contextProvider";

export default function NewTask({ role }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [started, setStarted] = useState("");
  const [toEnd, setToEnd] = useState("");
  const [priority, setPriority] = useState("high");
  const [waitMessage, setWaitMessage] = useState(false);
  const [employeesData, setEmpoyeesData] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const navigate = useNavigate();
  const request = configureAuthenticatedRequest();
  const { loginRole } = useGlobalContext();

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
  //get employees to assign task by admin
  const getEmployeesData = () => {
    request
      .get(
        `/admin/get_employees?offset=${offset}&limit=${limit}&action='assign_task'`
      )
      .then((res) => {
        if (res.data && res.data.employees) {
          setEmpoyeesData(res.data.employees);
        }
      })
      .catch((error) => {
        //
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Fill the details below to add a new task</h3>

      <div className="mb-3">
        <label className="form-label">Task name</label>
        <input
          className="form-control"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="task name eg fixing bugs on backend"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Task description</label>
        <textarea
          className="form-control"
          type="text"
          pattern="[A-Za-z]+"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add detailed task description"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Starting date</label>
        <input
          className="form-control"
          type="datetime-local"
          value={started}
          onChange={(e) => setStarted(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Planned end date</label>
        <input
          className="form-control"
          type="date"
          value={toEnd}
          onChange={(e) => setToEnd(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Task priority</label>
        <select
          className="form-select"
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option disabled>--select priority--</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/*assign task by admin */}
      {role === "admin" ? (
        <div className="mb-3">
          <label className="form-label">Assign task to:</label>
          <select
            className="form-select"
            onClick={() => {
              getEmployeesData();
            }}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          >
            <option disabled>--select employee--</option>
            {employeesData ? (
              employeesData.map((employee, index) => (
                <option key={index} value={employee.user_id}>
                  {employee.first_name} {employee.last_name}
                </option>
              ))
            ) : (
              <option value=""> No employees found</option>
            )}
          </select>
        </div>
      ) : null}

      <button type="submit" className="btn btn-primary ">
        {waitMessage ? "Adding task..." : "Add new task"}
      </button>
    </form>
  );
}
