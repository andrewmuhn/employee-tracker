const { getAllRoles, addRole, deleteRole } = require("./role");
const {
  getAllDepartments,
  getTotalBudget,
  addDepartment,
  deleteDepartment,
} = require("./department");
const {
  getAllEmployees,
  getEmployeesByManager,
  getEmployeesByDepartment,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./employee");

module.exports = {
  getAllDepartments,
  getTotalBudget,
  addDepartment,
  deleteDepartment,
  getAllRoles,
  addRole,
  deleteRole,
  getAllEmployees,
  getEmployeesByManager,
  getEmployeesByDepartment,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
