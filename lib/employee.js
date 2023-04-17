const inquirer = require("inquirer");
const {
  getAllDepartments,
  getAllEmployees,
  getEmployeesByManager,
  getEmployeesByDepartment,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllRoles,
} = require("../db");
const {
  getEmployeeNames,
  getRoleNames,
  getManagerId,
  getRoleId,
  getManagerNames,
} = require("../helper");

const handleGetAllEmployees = async () => {
  const employees = await getAllEmployees();
  console.log("\n");
  console.table(employees);
};

const handleEmployeesByManager = async () => {
  const managers = await getManagerNames();

  inquirer
    .prompt([
      {
        type: "list",
        name: "manager",
        message: "Which manager do you want to view?",
        choices: managers,
      },
    ])
    .then(async (answer) => {
      const managerId = await getManagerId(answer.manager);

      getEmployeesByManager(managerId);
    });
};

const handleEmployeesByDepartment = async () => {};

const handleAddEmployee = async () => {
  const employees = await getEmployeeNames();
  employees.push("N/A");
  const roles = await getRoleNames();

  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the new employee's first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the new employee's last name",
      },
      {
        type: "list",
        name: "role",
        message: "What is there role",
        choices: roles,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is there manager",
        choices: employees,
      },
    ])
    .then(async (answers) => {
      const roleId = await getRoleId(answers.role);

      let managerId;
      if (answers.manager === "N/A") {
        managerId = null;
      } else {
        managerId = await getManagerId(answers.manager);
      }

      addEmployee(answers.firstName, answers.lastName, roleId, managerId);
    });
};

const handleUpdateEmployee = async () => {};

const handleDeleteEmployee = async () => {};

module.exports = {
  handleGetAllEmployees,
  handleEmployeesByManager,
  handleEmployeesByDepartment,
  handleAddEmployee,
  handleUpdateEmployee,
  handleDeleteEmployee,
};
