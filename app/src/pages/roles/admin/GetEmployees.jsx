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
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  showing {count.pageCount} of {count.total}
                </th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Job Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employeesData.map((employee, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.job_title}</td>
                  <td>{employee.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>No employees found</h3>
      )}
    </>
  );
}
