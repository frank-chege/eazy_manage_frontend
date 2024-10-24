import { Link, useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import NewTask from "./NewTask";
import ViewTasks from "./ViewTasks";

export default function TasksLayout({ role }) {
  const url = `/${role}/tasks/pending`;
  const location = useLocation();
  // Determine if the current path is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="flex justify-center items-center py-6 px-4">
        <nav className="flex justify-between w-full max-w-md space-x-4">
          {/* Pending Link */}
          <Link
            to={`/${role}/tasks/pending`}
            className={`px-4 py-2 rounded-lg flex items-center justify-between ${
              isActive(`/${role}/tasks/pending`)
                ? "bg-black text-red-700 font-bold"
                : "bg-gray-900 text-white"
            } hover:bg-black hover:text-white transition duration-200`}
          >
            Pending
          </Link>

          {/* Completed Link */}
          <Link
            to={`/${role}/tasks/completed`}
            className={`px-4 py-2 rounded-lg ${
              isActive(`/${role}/tasks/completed`)
                ? "bg-black text-red-700 font-bold"
                : "bg-gray-900 text-white"
            } hover:bg-black hover:text-white transition duration-200`}
          >
            Completed
          </Link>

          {/* New Task Link */}
          <Link
            to={`/${role}/tasks/new_task`}
            className={`px-4 py-2 rounded-lg flex items-center ${
              isActive(`/${role}/tasks/new_task`)
                ? "bg-black text-red-700 font-bold"
                : "bg-gray-900 text-white"
            } hover:bg-black hover:text-white transition duration-200`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Assign Task
          </Link>
        </nav>
      </div>

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
