const router = require("express").Router();
const {
  getAllDepartments,
  getTotalBudget,
  addDepartment,
  deleteDepartment,
} = require("../db");

router.route("/").get(getAllDepartments).post(addDepartment);

router.route("/:id").delete(deleteDepartment);

router.route("/budget/:id").get(getTotalBudget);

module.exports = router;
