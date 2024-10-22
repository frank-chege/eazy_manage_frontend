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
            </div>
          ) : null}

          <table>
            <thead>
              <tr>
                <th>
                  showing {count.pageCount} of {count.total}
                </th>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Started</th>
                <th>Planned end date</th>
                {/* no action column for admin pending tasks */}
                {role === "admin" && status === "pending" ? null : (
                  <th>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.task_name}</td>
                  <td>{task.description}</td>
                  <td>{task.priority}</td>
                  <td>{task.started}</td>
                  <td>{task.to_end}</td>
                  {/* render different actions based on either pending or completed tasks */}
                  {status === "pending" ? (
                    // hide action column for admin in pending tasks
                    role === "admin" ? null : (
                      <td>
                        <button
                          onClick={() =>
                            changeStatus("completed", task.task_id)
                          }
                        >
                          Mark done
                        </button>
                      </td>
                    )
                  ) : (
                    <td>
                      <button
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
          <button
            onClick={() => {
              setOffset(limit * pageNum);
              setPageNum((prev) => prev - 1);
              toggleRefresh((prev) => !prev);
            }}
          >
            Previous page
          </button>
          <button
            onClick={() => {
              setOffset(limit * pageNum);
              setPageNum((prev) => prev + 1);
              toggleRefresh((prev) => !prev);
            }}
          >
            Next page
          </button>
        </div>
      ) : (
        <h3>No tasks found</h3>
      )}
    </>
  );
}
