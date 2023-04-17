const { getAllRoles, getAllEmployees, getAllDepartments } = require("../db");

const getManagerNames = async () => {
  const data = await getAllEmployees();
  const managerArr = [];

  for (let i = 0; i < data.length; i++) {
    const manager = data[i].Manager;
    if (manager !== null && !managerArr.includes(manager)) {
      managerArr.push(manager);
    }
  }
  return managerArr;
};

const getEmployeeNames = async () => {
  const data = await getAllEmployees();
  let employees = [];
  for (let i = 0; i < data.length; i++) {
    const firstName = data[i]["First Name"];
    const lastName = data[i]["Last Name"];
    const employee = `${firstName} ${lastName}`;
    employees.push(employee);
  }
  return employees;
};

const getRoleNames = async () => {
  const data = await getAllRoles();
  let roles = [];
  for (let i = 0; i < data.length; i++) {
    const jobTitle = data[i]["Job Title"];
    roles.push(jobTitle);
  }
  return roles;
};

const getDepartmentNames = async () => {};

const getManagerId = async (manager) => {
  const name = manager.split(" ");
  const data = await getAllEmployees();
  let managerId;
  for (let i = 0; i < data.length; i++) {
    const firstName = data[i]["First Name"];
    const lastName = data[i]["Last Name"];
    if (firstName === name[0] && lastName === name[1]) {
      managerId = data[i].id;
    }
  }

  return managerId;
};

const getRoleId = async (role) => {
  const roleData = await getAllRoles();
  let roleId;
  for (let i = 0; i < roleData.length; i++) {
    console.log(roleData[i]["Job Title"]);
    if (roleData[i]["Job Title"] === role) {
      roleId = roleData[i].id;
    }
  }
  return roleId;
};

module.exports = {
  getManagerNames,
  getEmployeeNames,
  getRoleNames,
  getDepartmentNames,
  getManagerId,
  getRoleId,
};
