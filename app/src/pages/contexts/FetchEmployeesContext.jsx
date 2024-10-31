//fetch employees context
import React, { createContext, useState, useContext, useEffect } from "react";
import { configureAuthenticatedRequest } from "../common/utils";

const FetchEmployeeContext = createContext();
//custom hook to access the context
export const useFetchEmployeeContext = () => useContext(FetchEmployeeContext);

const FetchEmployeeContextProvider = ({ children }) => {
  const [fetchEmployees, setFetchEmployees] = useState(false);
  const [employeesData, setEmployeesData] = useState(null);
  const [employeePagination, setEmployeePagination] = useState({
    offset: 0,
    limit: 20,
  });
  const request = configureAuthenticatedRequest();

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await request.get(
          `/admin/get_employees?offset=${employeePagination.offset}&limit=${employeePagination.limit}&action='assign_task'`
        );
        if (res.data && res.data.employees) {
          setEmployeesData(res.data.employees);
        }
      } catch (error) {
        toast.error("Error loading employees");
      } finally {
        setFetchEmployees(false);
      }
    };
    //fetch employees when state is true
    {
      fetchEmployees ? getEmployees() : null;
    }
  }, [fetchEmployees]);

  return (
    <FetchEmployeeContext.Provider
      value={{
        fetchEmployees,
        setFetchEmployees,
        employeesData,
        setEmployeePagination,
      }}
    >
      {children}
    </FetchEmployeeContext.Provider>
  );
};
export default FetchEmployeeContextProvider;
