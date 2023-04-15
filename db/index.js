const db = require("../config/db");
const cTable = require("console.table");

const getAllDepartments = (req, res) => {
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
};

const addDepartment = (req, res) => {
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
};

const updateDepartment = (req, res) => {
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
        console.log(`Changed department id: ${params[1]} to ${params[0]}`);
      }
    })
    .catch((err) => console.error(err));
};

const deleteDepartment = (req, res) => {
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
        console.log(`Deleted department id: ${param}`);
      }
    })
    .catch((err) => console.error(err));
};

const getAllRoles = (req, res) => {
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
};

const addRole = (req, res) => {
  const sql = "";

  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
    })
    .catch((err) => console.error(err));
};

const updateRole = (req, res) => {
  const sql = "";

  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
    })
    .catch((err) => console.error(err));
};

const deleteRole = (req, res) => {
  const sql = "";

  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
    })
    .catch((err) => console.error(err));
};

const getAllEmployees = (req, res) => {
  const sql = "";

  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
    })
    .catch((err) => console.error(err));
};

const addEmployee = (req, res) => {
  const sql = "";

  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
    })
    .catch((err) => console.error(err));
};

const updateEmployee = (req, res) => {
  const sql = "";

  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
    })
    .catch((err) => console.error(err));
};

const deleteEmployee = (req, res) => {
  const sql = "";

  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getAllDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getAllRoles,
  addRole,
  updateRole,
  deleteRole,
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
