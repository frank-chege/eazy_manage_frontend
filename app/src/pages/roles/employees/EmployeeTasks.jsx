export default function EmployeeTasks() {
  return (
    <>
      <nav>
        <Link to="/employee/tasks/pending">Pending</Link>
        <Link to="/employee/tasks/completed">Completed</Link>
        <Link to="/employee/tasks/add_new">Add new</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="pending" />} />
        <Route path="/pending" element={<ViewEmployees />} />
        <Route path="/completed" element={<AddEmployee />} />
        <Route path="/add_new" element={<AddEmployee />} />
      </Routes>
    </>
  );
}
