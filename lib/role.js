const inquirer = require("inquirer");
const { getAllRoles, addRole, deleteRole } = require("../db");
const {
  getRoleNames,
  getRoleId,
  getDepartmentNames,
  getDepartmentId,
} = require("../helper");

const handleGetAllRoles = async () => {
  const roles = await getAllRoles();
  console.log("\n");
  console.table(roles);
};

const handleAddRole = async () => {
  const departments = await getDepartmentNames();

  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
        validate: (input) => {
          const parsed = parseInt(input);
          if (isNaN(parsed)) {
            console.error(
              "Invalid salary. Salary input must be an integer over 20,000"
            );
            return false;
          } else if (parsed < 20000) {
            console.error(
              "Invalid salary. Salary input must be an integer over 20,000"
            );
            return false;
          } else return true;
        },
      },
      {
        type: "list",
        name: "department",
        message: "Which department does the role belong to?",
        choices: departments,
      },
    ])
    .then(async (answer) => {
      const departmentId = await getDepartmentId(answer.department);
      addRole(answer.role, answer.salary, departmentId);
    });
};

const handleDeleteRole = async () => {
  const roles = await getRoleNames();

  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Which role do you want to delete?",
        choices: roles,
      },
    ])
    .then(async (answer) => {
      const roleId = await getRoleId(answer.role);
      deleteRole(roleId);
    });
};

module.exports = {
  handleGetAllRoles,
  handleAddRole,
  handleDeleteRole,
};
