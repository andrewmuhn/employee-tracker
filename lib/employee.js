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
  getEmployeeId,
  getRoleId,
  getManagerNames,
  getDepartmentNames,
  getDepartmentId,
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
        message: "Which manager do you want to view",
        choices: managers,
      },
    ])
    .then(async (answer) => {
      const managerId = await getEmployeeId(answer.manager);

      getEmployeesByManager(managerId);
    });
};

const handleEmployeesByDepartment = async () => {
  const departments = await getDepartmentNames();

  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Which department do you want to view",
        choices: departments,
      },
    ])
    .then(async (answer) => {
      const departmentId = await getDepartmentId(answer.department);

      getEmployeesByDepartment(departmentId);
    });
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
        managerId = await getEmployeeId(answers.manager);
      }

      addEmployee(answers.firstName, answers.lastName, roleId, managerId);
    });
};

const handleUpdateEmployee = async () => {
  const employees = await getEmployeeNames();
  const roles = await getRoleNames();

  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee do you want to update",
        choices: employees,
      },
      {
        type: "list",
        name: "role",
        message:
          "What is there new role (Pick the same role if their role hasn't changed)",
        choices: roles,
      },
      {
        type: "list",
        name: "manager",
        message:
          "Who is there new manager (Pick the same manager if their manager hasn't changed)",
        choices: employees,
      },
    ])
    .then(async (answers) => {
      const roleId = await getRoleId(answers.role);
      const managerId = await getEmployeeId(answers.manager);
      const employeeId = await getEmployeeId(answers.employee);

      updateEmployee(roleId, managerId, employeeId);
    });
};

const handleDeleteEmployee = async () => {
  const employees = await getEmployeeNames();

  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee do you want to delete",
        choices: employees,
      },
    ])
    .then(async (answer) => {
      const employeeId = await getEmployeeId(answer.employee);

      deleteEmployee(employeeId);
    });
};

module.exports = {
  handleGetAllEmployees,
  handleEmployeesByManager,
  handleEmployeesByDepartment,
  handleAddEmployee,
  handleUpdateEmployee,
  handleDeleteEmployee,
};
