const { Router } = require("express");
const employeeRouter = require("./employee");
const departmentRouter = require("./department");
const roleRouter = require("./role");

const router = Router();

router.use("/employee", employeeRouter);
router.use("/department", departmentRouter);
router.use("/role", roleRouter);

module.exports = router;
