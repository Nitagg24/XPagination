import React, { useState, useEffect } from "react";
import styles from "./EmployeeTable.module.css";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      alert("Failed to fetch data");
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const goToNextPage = () => {
    const newPage = currentPage + 1;
    if (newPage <= Math.ceil(employees.length / employeesPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const goToPreviousPage = () => {
    const newPage = currentPage - 1;
    if (newPage >= 1) {
      setCurrentPage(newPage);
    }
  };

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
        <span className={styles.pageNumber}>{currentPage}</span>
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
