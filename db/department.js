const db = require("../config/db");

module.exports = {
  getAllDepartments() {
    const sql = "SELECT id, name AS Name FROM department";

    return db
      .promise()
      .query(sql)
      .then((results) => {
        return results[0];
      })
      .catch((err) => console.error(err));
  },

  getTotalBudget(id) {
    const sql = `SELECT department.name AS Department, SUM(role.salary) AS "Total Expenses" FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.id = ?`;
    const param = id;

    return db
      .promise()
      .query(sql, param)
      .then((results) => {
        return results[0];
      })
      .catch((err) => console.error(err));
  },

  addDepartment(name) {
    const sql = "INSERT INTO department (name) VALUES (?)";
    const param = name;

    return db
      .promise()
      .query(sql, param)
      .then((results) => {
        console.log(`\nAdded ${param} to the database`);
      })
      .catch((err) => console.error(err));
  },

  updateDepartment(name, id) {
    const sql = "UPDATE department SET name = ? WHERE id = ?";
    const params = [name, id];

    return db
      .promise()
      .query(sql, params)
      .then((results) => {
        if (!results[0].affectedRows) {
          console.error("ERROR: Department not found");
        } else {
          console.log(`\nUpdated database with ${params[0]}`);
        }
      })
      .catch((err) => console.error(err));
  },

  deleteDepartment(id) {
    const sql = "DELETE FROM department WHERE id = ?";
    const param = id;

    return db
      .promise()
      .query(sql, param)
      .then((results) => {
        if (!results[0].affectedRows) {
          console.error("ERROR: Department not found");
        } else {
          console.log(`\nDeleted a department from the database`);
        }
      })
      .catch((err) => console.error(err));
  },
};
