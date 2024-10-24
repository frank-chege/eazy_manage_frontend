//completed and pending tasks component
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { configureAuthenticatedRequest } from "../common/utils";

export default function ViewTasks({ status = "pending", role }) {
  const [tasks, setTasks] = useState(null);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const request = configureAuthenticatedRequest();
  const [refresh, toggleRefresh] = useState(false);
  const [count, setCount] = useState({
    pageCount: 0,
    total: 0,
  });
  const [dateFilter, setDateFilter] = useState({
    to: null,
    from: null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  // Reset component states when status changes
  useEffect(() => {
    setTasks(null);
    setLimit(20);
    setOffset(0);
    setCount({ pageCount: 0, total: 0 });
    setDateFilter({ to: null, from: null });
    setShowFilters(false);
    setPageNum(1);
  }, [status]);

  //change task status
  const changeStatus = useCallback((newStatus, taskId) => {
    const payload = { newStatus, taskId };
    request
      .put("/tasks/change_status", payload)
      .then((res) => {
        toast.success(res.data.message);
        //trigger tasks refresh
        toggleRefresh((prevRefrehState) => !prevRefrehState);
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
      });
  }, []);

  //get tasks
  useEffect(() => {
    const filter = JSON.stringify({ to: dateFilter.to, from: dateFilter.from });
    request
      .get(
        `/tasks/get_tasks?offset=${offset}&limit=${limit}&status=${status}&filter=${encodeURIComponent(
          filter
        )}`
      )
      .then((res) => {
        if (res.data.tasks) {
          setTasks(res.data.tasks);
          setCount({
            pageCount: res.data.count.page_count,
            total: res.data.count.total,
          });
        } else {
          toast.error(`An error occured fetching ${status} tasks`);
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          //remove pending tasks rendered previously
          setTasks(null);
        } else if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occured. Please try again");
        }
      });
  }, [offset, limit, status, refresh]);

  return (
    <>
      <div></div>
      {tasks ? (
        <div>
          {/* limit */}
          <label className="form-label">Records per page</label>
          <select
            className="form-select"
            onChange={(e) => setLimit(e.target.value)}
            required
          >
            <option disabled>--records per page--</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
            <option value="80">80</option>
            <option value="100">100</option>
          </select>
          {/* filters */}
          <div style={{ display: "flex" }}>
            <p>Filter by:</p>
            <button
              onClick={() => setShowFilters((currentState) => !currentState)}
            >
              Date
            </button>
          </div>
          {showFilters ? (
            <div>
              <label className="form-label">From</label>
              <input
                className="form-control"
                type="date"
                value={dateFilter.from}
                onChange={(e) =>
                  setDateFilter((prev) => ({ ...prev, from: e.target.value }))
                }
                required
              />
              <label className="form-label">To</label>
              <input
                className="form-control"
                type="date"
                value={dateFilter.to}
                onChange={(e) =>
                  setDateFilter((prev) => ({ ...prev, to: e.target.value }))
                }
                required
              />
              <button onClick={() => toggleRefresh((prev) => !prev)}>
                Apply filter
              </button>
              <button
                onClick={() => {
                  setDateFilter({ to: null, from: null });
                  toggleRefresh((prev) => !prev);
                }}
              >
                Remove filter
              </button>
            </div>
          ) : null}

          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-red-500 text-white text-left">
                <th className="border px-4 py-2">
                  showing {offset + 1} - {offset + count.pageCount} of{" "}
                  {count.total}
                </th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Description</th>
                {role === "admin" && (
                  <th className="border px-4 py-2">Employee</th>
                )}
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">Started</th>
                <th className="border px-4 py-2">
                  {status === "pending" ? "Planned end date" : "Ended"}
                </th>
                {!(role === "admin" && status === "pending") && (
                  <th className="border px-4 py-2">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-red-100" : "bg-red-50"
                  } text-left`}
                >
                  {pageNum === 1 ? (
                    <td className="border px-4 py-2">{index + 1}</td>
                  ) : (
                    <td className="border px-4 py-2">{index + 1 + offset}</td>
                  )}

                  <td className="border px-4 py-2">{task.task_name}</td>
                  <td className="border px-4 py-2">{task.description}</td>
                  {role === "admin" && (
                    <td className="border px-4 py-2">
                      {task.user.first_name} {task.user.last_name}
                    </td>
                  )}

                  {/* Priority text styling based on its value */}
                  <td
                    className={`border px-4 py-2 font-bold ${
                      task.priority === "HIGH"
                        ? "text-red-600"
                        : task.priority === "Medium"
                        ? "text-orange-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {task.priority}
                  </td>

                  <td className="border px-4 py-2">{task.started}</td>
                  <td className="border px-4 py-2">{task.to_end}</td>

                  {status === "pending" ? (
                    role === "admin" ? null : (
                      <td className="border px-4 py-2">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded"
                          onClick={() =>
                            changeStatus("completed", task.task_id)
                          }
                        >
                          Mark done
                        </button>
                      </td>
                    )
                  ) : (
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => changeStatus("pending", task.task_id)}
                      >
                        Mark incomplete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/*page toggle buttons*/}
          {pageNum > 1 ? (
            <button
              onClick={() => {
                setOffset((pageNum - 2) * limit);
                setPageNum((prev) => prev - 1);
                toggleRefresh((prev) => !prev);
              }}
            >
              Previous page
            </button>
          ) : null}
          {count.pageCount + offset !== count.total ? (
            <button
              onClick={() => {
                setOffset(limit * pageNum);
                setPageNum((prev) => prev + 1);
                toggleRefresh((prev) => !prev);
              }}
            >
              Next page
            </button>
          ) : null}
        </div>
      ) : (
        <h3>No tasks found</h3>
      )}
    </>
  );
}
