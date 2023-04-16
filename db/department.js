const db = require("../config/db");
const cTable = require("console.table");

module.exports = {
  getAllDepartments(req, res) {
    const sql = "SELECT id, name AS Name FROM department";

    db.promise()
      .query(sql)
      .then((results) => {
        res.json({
          message: "Get request for all departments",
        });
        console.table(results[0]);
      })
      .catch((err) => console.error(err));
  },

  getTotalBudget(req, res) {
    const sql = `SELECT department.name AS Department, SUM(role.salary) AS "Total Expenses" FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id WHERE department.id = ?`;
    const param = req.params.id;

    db.promise()
      .query(sql, param)
      .then((results) => {
        res.json({
          message: "Get expenses for department by id",
        });
        console.table(results[0]);
      })
      .catch((err) => console.error(err));
  },

  addDepartment(req, res) {
    const sql = "INSERT INTO department (name) VALUES (?)";
    const param = req.body.name;

    db.promise()
      .query(sql, param)
      .then((results) => {
        res.json({
          message: "Post request to department",
          added: req.body,
        });
        console.log(`Added ${param} to the database`);
      })
      .catch((err) => console.error(err));
  },

  updateDepartment(req, res) {
    const sql = "UPDATE department SET name = ? WHERE id = ?";
    const params = [req.body.name, req.params.id];

    db.promise()
      .query(sql, params)
      .then((results) => {
        if (!results[0].affectedRows) {
          res.json({
            message: "Department not found",
          });
        } else {
          res.json({
            message: "Update request to department",
            changed: req.body,
          });
          console.log(`Updated database with ${params[0]}`);
        }
      })
      .catch((err) => console.error(err));
  },

  deleteDepartment(req, res) {
    const sql = "DELETE FROM department WHERE id = ?";
    const param = req.params.id;

    db.promise()
      .query(sql, param)
      .then((results) => {
        if (!results[0].affectedRows) {
          res.json({
            message: "Department not found",
          });
        } else {
          res.json({
            message: "Delete request to department",
            deletion: req.body,
          });
          console.log(`Deleted a department from the database`);
        }
      })
      .catch((err) => console.error(err));
  },
};
