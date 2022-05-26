const inquirer = require("inquirer");
const Department = require("./Department");
const Role = require("./Role");
const Employee = require("./Employee");

class Prompt {
  static menu() {
    inquirer
      .prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      })
      .then(({ action }) => {
        switch (action) {
          case "View all departments":
            Department.allDepartments();
            break;
          case "View all roles":
            break;
          case "View all employees":
            break;
          case "Add a department":
            break;
          case "Add a role":
            break;
          case "Add an employee":
            break;
          case "Update an employee role":
            break;
        }
      });
  }
}

module.exports = Prompt;
