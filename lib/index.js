const inquirer = require("inquirer");
const figlet = require("figlet");
const { getAllRoles, addRole, deleteRole } = require("./role");
const {
  getAllDepartments,
  getTotalBudget,
  addDepartment,
  deleteDepartment,
} = require("./department");
const {
  getAllEmployees,
  getEmployeesByManager,
  getEmployeesByDepartment,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./employee");

class CLI {
  constructor() {}
  asciHeader() {
    figlet("Employee \nManager!", (err, data) => {
      if (err) {
        console.log("Figlet failed");
        console.dir(err);
        return;
      }
      console.log(data);
    });
  }

  run() {
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
        console.log(answer);
        switch (answer.mainMenu) {
          case "View all employees":
            getAllEmployees();
            break;
          case "View employees by manager":
            getEmployeesByManager();
            break;
          case "View employees by department":
            getEmployeesByDepartment();
            break;
          case "Add an employee":
            addEmployee();
            break;
          case "Update an employee role or manager":
            updateEmployee();
            break;
          case "Delete an employee":
            deleteEmployee();
            break;
          case "View all roles":
            getAllRoles();
            break;
          case "Add a role":
            addRole();
            break;
          case "Delete a role":
            deleteRole();
            break;
          case "View all departments":
            getAllDepartments();
            break;
          case "View total utilized budget of a department":
            getTotalBudget();
            break;
          case "Add a department":
            addDepartment();
            break;
          case "Delete a department":
            deleteDepartment();
            break;
          case "Quit":
            console.log(
              'Thanks for using employee manager! If you want to run again please run "npm run start" from your command line.'
            );
            break;
        }
      });
  }
}

module.exports = CLI;
