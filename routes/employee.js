const router = require("express").Router();
const {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../db");

router.route("/").get(getAllEmployees).post(addEmployee);

router.route("/:id").put(updateEmployee).delete(deleteEmployee);

module.exports = router;
