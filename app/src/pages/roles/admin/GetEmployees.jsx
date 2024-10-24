import { useEffect, useState } from "react";
import { configureAuthenticatedRequest } from "../../common/utils";
import { toast } from "react-toastify";

export default function GetEmployees() {
  const request = configureAuthenticatedRequest();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [employeesData, setEmployeesData] = useState(null);
  const [count, setCount] = useState({
    pageCount: 0,
    total: 0,
  });

  useEffect(() => {
    request
      .get(`/admin/get_employees?offset=${offset}&limit=${limit}`)
      .then((res) => {
        if (res.data.employees) {
          setEmployeesData(res.data.employees);
          setCount({
            pageCount: res.data.count.page_count,
            total: res.data.count.total,
          });
        } else {
          toast.error("An error occured while fetching employees");
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
      {employeesData ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="py-2 px-4 text-left">
                  Showing {count.pageCount} of {count.total}
                </th>
                <th className="py-2 px-4 text-left">First name</th>
                <th className="py-2 px-4 text-left">Last name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Department</th>
                <th className="py-2 px-4 text-left">Job Title</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {employeesData.map((employee, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-t border-gray-200`}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{employee.first_name}</td>
                  <td className="py-2 px-4">{employee.last_name}</td>
                  <td className="py-2 px-4">{employee.email}</td>
                  <td className="py-2 px-4">{employee.department}</td>
                  <td className="py-2 px-4">{employee.job_title}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        employee.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="text-center text-gray-500">No employees found</h3>
      )}
    </>
  );
}
