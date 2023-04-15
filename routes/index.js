const express = require("express");
const employeeRouter = require("./employee");
const departmentRouter = require("./department");
const roleRouter = require("./role");

const app = express();

app.use("/employee", employeeRouter);
app.use("/department", departmentRouter);
app.use("/role", roleRouter);

module.exports = app;
