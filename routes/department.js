const router = require("express").Router();
const { getAllDepartments, addDepartment, deleteDepartment } = require("../db");

router.route("/").get(getAllDepartments).post(addDepartment);

router.route("/:id").delete(deleteDepartment);

module.exports = router;
