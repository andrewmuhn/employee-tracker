# Employee Tracker

## Description

- The goal of this app is to have an easy to use CLI for a company to manage their employees, departments and roles.
- The personal goal with creating this application was to gain fluency with SQL servers, specifically mySQL and interacting with them via a node server.
- I gained a better understanding of why there is a need for return a promise in asynchronous code through creating a more modular design to my file structure.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Issues](#issues)
- [Credits](#credits)

## Installation

- Clone the [repo](https://github.com/andrewmuhn/employee-tracker) to your local machine.
- Navigate to that file directory and run from your terminal:

```bash
	npm i
```

(Note: Node.js and npm need to be installed to perform this action. Installing Node.js will also install npm)

- Then in order to source the database and seed it with test data run from your terminal:

```bash
	mysql -u root -p
	SOURCE path/to/schema.sql
	SOURCE path/to/seeds.sql
```

(Note: MySql needs to be installed in order to run these commands. Root is the default username but may be different if you selected otherwise. The first command will prompt you for your mySQL password created on installation)

- Then create a .env file and copy the contents of the .env.example over and add your mySQL username and password to the appropraite fields. See below as an example.

```env
	DB_HOST: "localhost"
	DB_USER: "root"
	DB_PASS: "Your Password"
	DB_NAME: "employee_db"
```

## Usage

- Follow the above installation steps to get started.
- Then run from your terminal:

```bash
	npm start
```

- Use the CLI to manage your employees: Functions include:
  - You can use the CLI to view, add, or delete an employee, role, or department
  - You can use the CLI to update an employees role and/ or manager
  - You can also choose to view employees by their department or manager
  - You can also see the utilzed budget of a department

[Link to repo](https://github.com/andrewmuhn/employee-tracker)

[Link to video walkthrough of application]()

## Issues

- Currently if you try and delete a role or department that has an employee or role referencing it the application with error out. While this is good as it prevents deleting data unwittingly I would prefer to have the CLI validate the request and prevent the user from doing this in the CLI rather than throw an error

- The view total utilized budget will display incorrect information if there is not at least one employee in each role associated with the department.

## Credits

Project created by [Andrew Muhn](https://github.com/andrewmuhn)
as part of UofO Edx Bootcamp

Utilized:

- [node.js](https://nodejs.org/en/about)
- [mysql2](https://github.com/sidorares/node-mysql2#readme)
- [inquirer](https://github.com/SBoudrias/Inquirer.js#readme)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [console.table](https://github.com/bahmutov/console.table)
- [figlet](https://github.com/patorjk/figlet.js#readme)
- [nodemon](https://www.npmjs.com/package/nodemon)

Credits to tutorials and forums used:

- [Idea to use nodemon](https://www.youtube.com/watch?v=SccSCuHhOw0&t=218s)
- [Help in converted asciiHeader to a promise](https://stackoverflow.com/questions/69158795/how-to-convert-a-callback-function-to-a-promise)

- Help from TA to fix circular depency issue and refactor code to bring all library functions back into index.
