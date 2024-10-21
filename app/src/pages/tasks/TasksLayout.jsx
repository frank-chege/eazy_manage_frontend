import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import NewTask from "./NewTask";
import ViewTasks from "./ViewTasks";

export default function TasksLayout({ role }) {
  const url = `/${role}/tasks/pending`;

  return (
    <>
      <nav>
        <Link to={`/${role}/tasks/pending`}>Pending</Link>
        <Link to={`/${role}/tasks/completed`}>Completed</Link>
        <Link to={`/${role}/tasks/new_task`}>New task</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="pending" />} />
        <Route
          path="/pending"
          element={<ViewTasks status="pending" role={role} />}
        />
        <Route
          path="/completed"
          element={<ViewTasks status="completed" role={role} />}
        />
        <Route path="/new_task" element={<NewTask role={role} />} />
      </Routes>
    </>
  );
}
