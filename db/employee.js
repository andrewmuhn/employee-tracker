const db = require("../config/db");
const cTable = require("console.table");

module.exports = {
  getAllEmployees(req, res) {
    const sql = `SELECT A.id, A.first_name AS "First Name", A.last_name AS "Last Name", role.title AS "Job Title", role.salary AS Salary, CONCAT(B.first_name, ' ', B.Last_Name) AS Manager FROM employee A LEFT JOIN employee B ON A.Manager_id = B.ID JOIN role ON A.role_id = role.id`;

    db.promise()
      .query(sql)
      .then((results) => {
        res.json({
          message: "Get request for all employees",
        });
        console.table(results[0]);
      })
      .catch((err) => console.error(err));
  },

  getEmployeesByManager(req, res) {
    const sql = `SELECT A.id, A.first_name AS "First Name", A.last_name AS "Last Name", role.title AS "Job Title", role.salary AS Salary, CONCAT(B.first_name, ' ', B.Last_Name) AS Manager FROM employee A LEFT JOIN employee B ON A.Manager_id = B.ID JOIN role ON A.role_id = role.id WHERE A.manager_id = ?`;
    const param = req.params.id;

    db.promise()
      .query(sql, param)
      .then((results) => {
        res.json({
          message: "Get request for employees by manager",
        });
        console.table(results[0]);
      })
      .catch((err) => console.error(err));
  },

  getEmployeesByDepartment(req, res) {},

  addEmployee(req, res) {
    const sql =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    params = [
      req.body.first_name,
      req.body.last_name,
      req.body.role_id,
      req.body.manager_id,
    ];

    db.promise()
      .query(sql, params)
      .then((results) => {
        res.json({
          message: "Post request to employee",
          added: req.body,
        });
        console.log(`Added ${params[0]} ${params[1]} to the database`);
      })
      .catch((err) => console.error(err));
  },

  updateEmployee(req, res) {
    const sql = "UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?";
    const params = [req.body.role_id, req.body.manager_id, req.params.id];

    db.promise()
      .query(sql, params)
      .then((results) => {
        if (!results[0].affectedRows) {
          res.json({
            message: "Employee not found",
          });
        } else {
          res.json({
            message: "Update request to employee",
            changed: req.body,
          });
          console.log("Updated employee's role");
        }
      })
      .catch((err) => console.error(err));
  },

  deleteEmployee(req, res) {
    const sql = "DELETE FROM employee WHERE id = ?";
    const param = req.params.id;

    db.promise()
      .query(sql, param)
      .then((results) => {
        if (!results[0].affectedRows) {
          res.json({
            message: "Employee not found",
          });
        } else {
          res.json({
            message: "Delete Request to employee",
            deletion: req.body,
          });
          console.log("Deleted an employee from the database");
        }
      })
      .catch((err) => console.error(err));
  },
};
