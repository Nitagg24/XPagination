import React, { useState, useEffect } from "react";
import styles from "./EmployeeTable.module.css";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const employeesPerPage = 10;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      alert("failed to fetch data");
    }
    setIsLoading(false);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const goToNextPage = () => {
    if (currentPage < Math.ceil(employees.length / employeesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.heading}>Employee Data Table</h1>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id} className={styles.tr}>
              <td className={styles.td}>{employee.id}</td>
              <td className={styles.td}>{employee.name}</td>
              <td className={styles.td}>{employee.email}</td>
              <td className={styles.td}>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          className={styles.button}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className={styles.pageNumber}>{currentPage}</div>

        <button
          className={styles.button}
          onClick={goToNextPage}
          disabled={
            currentPage === Math.ceil(employees.length / employeesPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default EmployeeTable;
