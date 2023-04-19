const inquirer = require("inquirer");
const figlet = require("figlet");

const {
  getEmployeeNames,
  getEmployeeId,
  getRoleNames,
  getRoleId,
  getManagerNames,
  getDepartmentNames,
  getDepartmentId,
} = require("../helper");

const {
  getAllEmployees,
  getEmployeesByManager,
  getEmployeesByDepartment,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllRoles,
  addRole,
  deleteRole,
  getAllDepartments,
  getTotalBudget,
  addDepartment,
  deleteDepartment,
} = require("../db");

const asciHeader = () => {
  return figlet("Employee \nManager!", (err, data) => {
    if (err) {
      console.log("Figlet failed");
      console.dir(err);
      return;
    }
    return data;
  });
};

const menu = () => {
  inquirer
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
          handleGetAllEmployees().then(() => menu());
          break;
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
          handleGetAllRoles().then(() => menu());
          break;
        case "Add a role":
          handleAddRole();
          break;
        case "Delete a role":
          handleDeleteRole();
          break;
        case "View all departments":
          handleGetAllDepartments().then(() => menu());
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
          process.exit();
      }
    });
};

// !---------------------------EMPLOYEE FUNCTIONS------------------------------------

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
      const managerId = await getEmployeeId(answer.manager);

      const employeesByManager = await getEmployeesByManager(managerId);
      console.log("\n");
      console.table(employeesByManager);
    })
    .then(() => menu());
};

const handleEmployeesByDepartment = async () => {
  const departments = await getDepartmentNames();

  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Which department do you want to view?",
        choices: departments,
      },
    ])
    .then(async (answer) => {
      const departmentId = await getDepartmentId(answer.department);

      const employeesByDepartment = await getEmployeesByDepartment(
        departmentId
      );

      console.log("\n");
      console.table(employeesByDepartment);
    })
    .then(() => menu());
};

const handleAddEmployee = async () => {
  const employees = await getEmployeeNames();
  employees.push("N/A");
  const roles = await getRoleNames();

  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the new employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the new employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is there role?",
        choices: roles,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is there manager?",
        choices: employees,
      },
    ])
    .then(async (answers) => {
      const roleId = await getRoleId(answers.role);

      let managerId;
      if (answers.manager === "N/A") {
        managerId = null;
      } else {
        managerId = await getEmployeeId(answers.manager);
      }

      await addEmployee(answers.firstName, answers.lastName, roleId, managerId);
    })
    .then(() => menu());
};

const handleUpdateEmployee = async () => {
  const employees = await getEmployeeNames();
  const roles = await getRoleNames();

  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee do you want to update?",
        choices: employees,
      },
      {
        type: "list",
        name: "role",
        message:
          "What is there new role (Pick the same role if their role hasn't changed)?",
        choices: roles,
      },
      {
        type: "list",
        name: "manager",
        message:
          "Who is there new manager (Pick the same manager if their manager hasn't changed)?",
        choices: employees,
      },
    ])
    .then(async (answers) => {
      const roleId = await getRoleId(answers.role);
      const managerId = await getEmployeeId(answers.manager);
      const employeeId = await getEmployeeId(answers.employee);

      await updateEmployee(roleId, managerId, employeeId);
    })
    .then(() => menu());
};

const handleDeleteEmployee = async () => {
  const employees = await getEmployeeNames();

  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee do you want to delete?",
        choices: employees,
      },
    ])
    .then(async (answer) => {
      const employeeId = await getEmployeeId(answer.employee);

      await deleteEmployee(employeeId);
    })
    .then(() => menu());
};

// !---------------------------DEPARTMENT FUNCTIONS----------------------------------

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
      const totalBudget = await getTotalBudget(departmentId);

      console.log("\n");
      console.table(totalBudget);
    })
    .then(() => menu());
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
    .then(async (answer) => await addDepartment(answer.department))
    .then(() => menu());
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
      await deleteDepartment(departmentId);
    })
    .then(() => menu());
};

// !-----------------------------ROLE FUNCTIONS--------------------------------------

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
      await addRole(answer.role, answer.salary, departmentId);
    })
    .then(() => menu());
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
      await deleteRole(roleId);
    })
    .then(() => menu());
};

module.exports = { menu, asciHeader };
