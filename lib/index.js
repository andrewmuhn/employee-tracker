const inquirer = require("inquirer");
const figlet = require("figlet");

const {
  handleGetAllDepartments,
  handleTotalBudget,
  handleAddDepartment,
  handleDeleteDepartment,
} = require("./department");
const {
  handleGetAllEmployees,
  handleEmployeesByManager,
  handleEmployeesByDepartment,
  handleAddEmployee,
  handleUpdateEmployee,
  handleDeleteEmployee,
} = require("./employee");
const {
  handleGetAllRoles,
  handleAddRole,
  handleDeleteRole,
} = require("./role");

const asciHeader = () => {
  figlet("Employee \nManager!", (err, data) => {
    if (err) {
      console.log("Figlet failed");
      console.dir(err);
      return;
    }
    console.log(data);
  });
};

const menu = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "mainMenu",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View employees by manager",
          "View employees by department",
          "Add an employee",
          "Update an employee role or manager",
          "Delete an employee",
          "View all roles",
          "Add a role",
          "Delete a role",
          "View all departments",
          "View total utilized budget of a department",
          "Add a department",
          "Delete a department",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.mainMenu) {
        case "View all employees":
          handleGetAllEmployees();
          return menu();
        case "View employees by manager":
          handleEmployeesByManager();
          break;
        case "View employees by department":
          handleEmployeesByDepartment();
          break;
        case "Add an employee":
          handleAddEmployee();
          break;
        case "Update an employee role or manager":
          handleUpdateEmployee();
          break;
        case "Delete an employee":
          handleDeleteEmployee();
          break;
        case "View all roles":
          handleGetAllRoles();
          break;
        case "Add a role":
          handleAddRole();
          break;
        case "Delete a role":
          handleDeleteRole();
          break;
        case "View all departments":
          handleGetAllDepartments();
          break;
        case "View total utilized budget of a department":
          handleTotalBudget();
          break;
        case "Add a department":
          handleAddDepartment();
          break;
        case "Delete a department":
          handleDeleteDepartment();
          break;
        case "Quit":
          console.log(
            'Thanks for using employee manager! If you want to run again please run "npm run start" from your command line.'
          );
          break;
      }
    });
};

module.exports = { menu, asciHeader };
