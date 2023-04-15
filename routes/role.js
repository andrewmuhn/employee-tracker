const router = require("express").Router();
const { getAllRoles, addRole, deleteRole } = require("../db");

router.route("/").get(getAllRoles).post(addRole);

router.route("/:id").delete(deleteRole);

module.exports = router;
