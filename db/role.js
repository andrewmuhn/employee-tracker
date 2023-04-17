const db = require("../config/db");
const cTable = require("console.table");

module.exports = {
  getAllRoles() {
    const sql = `SELECT role.id, role.title AS "Job Title", department.name AS Department, role.salary AS Salary FROM role JOIN department ON role.department_id = department.id`;

    return db
      .promise()
      .query(sql)
      .then((results) => {
        return results[0];
      })
      .catch((err) => console.error(err));
  },

  addRole(title, salary, department_id) {
    const sql =
      "INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)";
    const params = [title, salary, department_id];

    db.promise()
      .query(sql, params)
      .then((results) => {
        console.log(`\nAdded ${params[0]} to the database`);
      })
      .catch((err) => console.error(err));
  },

  deleteRole(id) {
    const sql = "DELETE FROM role WHERE id = ?";
    const param = id;

    db.promise()
      .query(sql, param)
      .then((results) => {
        if (!results[0].affectedRows) {
          console.error("ERROR: Role not found");
        } else {
          console.log(`\nDeleted a role from the database`);
        }
      })
      .catch((err) => console.error(err));
  },
};
