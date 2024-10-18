import { useEffect, useState } from "react";
import { configureRequest } from "../../common/utils";
import { toast } from "react-toastify";

export default function ViewEmployees() {
  const request = configureRequest();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [employeesData, setEmployeesData] = useState(null);

  useEffect(() => {
    request
      .get(`/employees/get/?offset=${offset}&limit=${limit}`)
      .then((res) => {
        if (res.data.employees) {
          setEmployeesData(res.data.employees);
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
  });

  return (
    <>
      {employeesData ? (
        <div>
          <table>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Job Title</th>
              <th>Status</th>
            </tr>
            {employeesData.map((employee, index) => {
              <tr>
                <td>employee.first_name</td>
                <td>employee.dep</td>
                <td>employee.job_title</td>
                <td>employee.status</td>
              </tr>;
            })}
          </table>
        </div>
      ) : (
        <h3>No employees found</h3>
      )}
    </>
  );
}
