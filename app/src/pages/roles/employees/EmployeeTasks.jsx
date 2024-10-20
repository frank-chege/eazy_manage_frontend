import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import NewTask from "./NewTask";
import ViewTasks from "./ViewTasks";

export default function EmployeeTasks() {
  return (
    <>
      <nav>
        <Link to="/employee/tasks/pending">Pending</Link>
        <Link to="/employee/tasks/completed">Completed</Link>
        <Link to="/employee/tasks/new_task">Add new</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="pending" />} />
        <Route path="/pending" element={<ViewTasks status="pending" />} />
        <Route path="/completed" element={<ViewTasks status="completed" />} />
        <Route path="/new_task" element={<NewTask />} />
      </Routes>
    </>
  );
}
