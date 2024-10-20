//completed and pending tasks component
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { configureAuthenticatedRequest } from "../../common/utils";

export default function ViewTasks({ status = "pending" }) {
  const [tasks, setTasks] = useState(null);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const request = configureAuthenticatedRequest();

  useEffect(() => {
    request
      .get(
        `/employees/get_tasks?offset=${offset}&limit=${limit}&status=${status}`
      )
      .then((res) => {
        if (res.data.tasks) {
          setTasks(res.data.tasks);
        } else {
          toast.error(`An error occured fetching ${status} tasks`);
        }
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
  }, [offset, limit]);

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
