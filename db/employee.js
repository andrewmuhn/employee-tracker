const db = require("../config/db");

module.exports = {
  getAllEmployees() {
    const sql = `SELECT A.id, A.first_name AS "First Name", A.last_name AS "Last Name", role.title AS "Job Title", role.salary AS Salary, CONCAT(B.first_name, ' ', B.Last_Name) AS Manager FROM employee A LEFT JOIN employee B ON A.Manager_id = B.ID JOIN role ON A.role_id = role.id`;

    return db
      .promise()
      .query(sql)
      .then((results) => {
        return results[0];
      })
      .catch((err) => console.error(err));
  },

  getEmployeesByManager(id) {
    const sql = `SELECT A.id, A.first_name AS "First Name", A.last_name AS "Last Name", role.title AS "Job Title", role.salary AS Salary, CONCAT(B.first_name, ' ', B.Last_Name) AS Manager FROM employee A LEFT JOIN employee B ON A.Manager_id = B.ID JOIN role ON A.role_id = role.id WHERE A.manager_id = ?`;
    const param = id;

    return db
      .promise()
      .query(sql, param)
      .then((results) => {
        return results[0];
      })
      .catch((err) => console.error(err));
  },

  getEmployeesByDepartment(id) {
    const sql = `SELECT A.id, A.first_name AS "First Name", A.last_name AS "Last Name", role.title AS "Job Title", department.name AS Department, role.salary AS Salary, CONCAT(B.first_name, ' ', B.last_name) AS Manager FROM employee A LEFT JOIN employee B ON A.manager_id = B.id JOIN role ON A.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ?`;
    const param = id;

    return db
      .promise()
      .query(sql, param)
      .then((results) => {
        return results[0];
      })
      .catch((err) => console.error(err));
  },

  addEmployee(firstName, lastName, roleId, managerId) {
    const sql =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    params = [firstName, lastName, roleId, managerId];

    return db
      .promise()
      .query(sql, params)
      .then((results) => {
        console.log(`\nAdded ${params[0]} ${params[1]} to the database`);
      })
      .catch((err) => console.error(err));
  },

  updateEmployee(roleId, managerId, id) {
    const sql = "UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?";
    const params = [roleId, managerId, id];

    return db
      .promise()
      .query(sql, params)
      .then((results) => {
        if (!results[0].affectedRows) {
          console.error("ERROR: Employee not found");
        } else {
          console.log("\nUpdated employee's role");
        }
      })
      .catch((err) => console.error(err));
  },

  deleteEmployee(id) {
    const sql = "DELETE FROM employee WHERE id = ?";
    const param = id;

    return db
      .promise()
      .query(sql, param)
      .then((results) => {
        if (!results[0].affectedRows) {
          console.error("ERROR: Employee not found");
        } else {
          console.log("\nDeleted an employee from the database");
        }
      })
      .catch((err) => console.error(err));
  },
};
