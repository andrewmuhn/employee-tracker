const router = require("express").Router();
const {
  getAllEmployees,
  getEmployeesByManager,
  getEmployeesByDepartment,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../db");

router.route("/").get(getAllEmployees).post(addEmployee);

router.route("/:id").put(updateEmployee).delete(deleteEmployee);

router.route("/manager/:id").get(getEmployeesByManager);

router.route("/department/:id").get(getEmployeesByDepartment);

module.exports = router;
