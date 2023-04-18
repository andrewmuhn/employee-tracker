const inquirer = require("inquirer");
const {
  getAllDepartments,
  getTotalBudget,
  addDepartment,
  deleteDepartment,
} = require("../db");
const { getDepartmentNames, getDepartmentId } = require("../helper");

const handleGetAllDepartments = async () => {
  const departments = await getAllDepartments();
  console.log("\n");
  console.table(departments);
};

const handleTotalBudget = async () => {
  const departments = await getDepartmentNames();

  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Which department budget do you want to see?",
        choices: departments,
      },
    ])
    .then(async (answer) => {
      const departmentId = await getDepartmentId(answer.department);
      getTotalBudget(departmentId);
    });
};

const handleAddDepartment = async () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => addDepartment(answer.department));
};

const handleDeleteDepartment = async () => {
  const departments = await getDepartmentNames();

  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Which department do you want to delete?",
        choices: departments,
      },
    ])
    .then(async (answer) => {
      const departmentId = await getDepartmentId(answer.department);
      deleteDepartment(departmentId);
    });
};

module.exports = {
  handleGetAllDepartments,
  handleTotalBudget,
  handleAddDepartment,
  handleDeleteDepartment,
};
