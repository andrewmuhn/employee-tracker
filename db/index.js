const db = require("../config/db");

const getAllDepartments = (req, res) => {
  const sql = "";
  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
    })
    .catch((err) => console.error(err));
};

const addDepartment = (req, res) => {
  const sql = "";
  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
    })
    .catch((err) => console.error(err));
};

const updateDepartment = (req, res) => {
  const sql = "";
  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
    })
    .catch((err) => console.error(err));
};

const deleteDepartment = (req, res) => {
  const sql = "";
  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
    })
    .catch((err) => console.error(err));
};

const getAllRoles = (req, res) => {
  const sql = "";
  db.promise()
    .query(sql)
    .then((results) => {
      res.json({});
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
