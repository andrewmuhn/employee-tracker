const router = require("express").Router();
const {
  getAllDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../db");

router.route("/").get(getAllDepartments).post(addDepartment);

router.route("/:id").put(updateDepartment).delete(deleteDepartment);

module.exports = router;
