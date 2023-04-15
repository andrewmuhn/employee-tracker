const router = require("express").Router();
const { getAllRoles, addRole, updateRole, deleteRole } = require("../db");

router.route("/").get(getAllRoles).post(addRole);

router.route("/:id").put(updateRole).delete(deleteRole);

module.exports = router;
