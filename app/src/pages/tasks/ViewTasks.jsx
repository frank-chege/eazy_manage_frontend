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
    request
      .get(`/tasks/get_tasks?offset=${offset}&limit=${limit}&status=${status}`)
      .then((res) => {
        if (res.data.tasks) {
          setTasks(res.data.tasks);
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
      {tasks ? (
        <div>
          <table>
            <thead>
              <tr>
                <th></th>
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
        </div>
      ) : (
        <h3>No tasks found</h3>
      )}
    </>
  );
}
