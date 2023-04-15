const db = require("../config/db");
const cTable = require("console.table");

module.exports = {
  getAllRoles(req, res) {
    const sql = `SELECT role.id, role.title AS "Job Title", department.name AS Department, role.salary AS Salary FROM role JOIN department ON role.department_id = department.id`;

    db.promise()
      .query(sql)
      .then((results) => {
        res.json({
          message: "Get request for all roles",
        });
        console.table(results[0]);
      })
      .catch((err) => console.error(err));
  },

  addRole(req, res) {
    const sql =
      "INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)";
    const params = [req.body.title, req.body.salary, req.body.department_id];

    db.promise()
      .query(sql, params)
      .then((results) => {
        res.json({
          message: "Post request to role",
          added: req.body,
        });
        console.log(`Added ${params[0]} to the database`);
      })
      .catch((err) => console.error(err));
  },

  deleteRole(req, res) {
    const sql = "DELETE FROM role WHERE id = ?";
    const param = req.params.id;

    db.promise()
      .query(sql, param)
      .then((results) => {
        if (!results[0].affectedRows) {
          res.json({
            message: "Role not found",
          });
        } else {
          res.json({
            message: "Delete request to role",
            deletion: req.body,
          });
          console.log(`Deleted a role from the database`);
        }
      })
      .catch((err) => console.error(err));
  },
};
