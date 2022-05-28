const inquirer = require("inquirer");
const TreePrompt = require("inquirer-tree-prompt");
inquirer.registerPrompt("tree", TreePrompt);
const cTable = require("console.table");
const Department = require("./Department");
const Role = require("./Role");
const Employee = require("./Employee");

const menu = [
  {
    type: "tree",
    name: "action",
    message: "What would you like to do?",
    tree: [
      {
        value: "Departments",
        open: false,
        children: ["View all departments", "Add a department"],
      },
      {
        value: "Roles",
        open: false,
        children: ["View all roles", "Add a role"],
      },
      {
        value: "Employees",
        open: false,
        children: [
          "View all employees",
          "View employees by manager",
          "View employees by department",
          "Add an employee",
          "Update an employee's role",
          "Update an employee's manager",
        ],
      },
      {
        value: "Exit",
      },
    ],
    validate: (action) => {
      if (["Departments", "Roles", "Employees"].includes(action)) {
        return false;
      } else {
        return true;
      }
    },
  },
];

function main() {
  inquirer.prompt(menu).then((answers) => {
    const { action } = answers;
    execute(action);
  });
}

function execute(action) {
  switch (action) {
    case "View all departments":
      allDepartments();
      break;
    case "Add a department":
      addDepartment();
      break;
    case "View all roles":
      allRoles();
      break;
    case "Add a role":
      addRole();
      break;
    case "View all employees":
      allEmployees();
      break;
    case "View employees by manager":
      employeesByManager();
      break;
    case "View employees by department":
      employeesByDepartment();
      break;
    case "Add an employee":
      addEmployee();
      break;
    case "Update an employee's role":
      updateEmployeeRole();
      break;
    case "Update an employee's manager":
      updateEmployeeManager();
      break;
    case "Exit":
      console.log("Press Ctrl+C to exit.");
      break;
  }
}

function allDepartments() {
  Department.all()
    .then((result) => {
      console.log("\n" + cTable.getTable(result));
    })
    .then(() => {
      main();
    });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the name of the department?",
    })
    .then((answers) => {
      const { department } = answers;
      Department.add(department)
        .then(() => {
          console.log(`Added ${department} to the database.`);
        })
        .then(() => {
          main();
        });
    });
}

function allRoles() {
  Role.all()
    .then((result) => {
      console.log("\n" + cTable.getTable(result));
    })
    .then(() => {
      main();
    });
}

function addRole() {
  Department.list().then((rows) => {
    let departmentChoices = [];
    for (i = 0; i < rows.length; i++) {
      departmentChoices.push(rows[i].name);
    }

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
        },
        {
          type: "list",
          name: "department",
          message: "Which department does the role belong to?",
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        const { role, salary, department } = answers;
        Role.add(role, salary, department)
          .then(() => {
            console.log(`Added ${role} to the database.`);
          })
          .then(() => {
            main();
          });
      });
  });
}

function allEmployees() {
  Employee.all()
    .then((result) => {
      console.log("\n" + cTable.getTable(result));
    })
    .then(() => {
      main();
    });
}

function employeesByManager() {
  Employee.list().then((rows) => {
    let managerChoices = ["None"];
    for (i = 0; i < rows.length; i++) {
      managerChoices.push(rows[i].employee);
    }

    inquirer
      .prompt({
        type: "list",
        name: "manager",
        message: "Select a manager.",
        choices: managerChoices,
      })
      .then((answers) => {
        Employee.byManager(answers)
          .then((result) => {
            console.log("\n" + cTable.getTable(result));
          })
          .then(() => {
            main();
          });
      });
  });
}

function employeesByDepartment() {
  Department.list().then((rows) => {
    let departmentChoices = [];
    for (i = 0; i < rows.length; i++) {
      departmentChoices.push(rows[i].name);
    }

    inquirer
      .prompt({
        type: "list",
        name: "department",
        message: "Select a department.",
        choices: departmentChoices,
      })
      .then((answers) => {
        Employee.byDepartment(answers)
          .then((result) => {
            console.log("\n" + cTable.getTable(result));
          })
          .then(() => {
            main();
          });
      });
  });
}

function addEmployee() {
  Role.list().then((rows) => {
    let roleChoices = [];
    for (i = 0; i < rows.length; i++) {
      roleChoices.push(rows[i].title);
    }

    Employee.list().then((rows) => {
      let employeeChoices = ["None"];
      for (i = 0; i < rows.length; i++) {
        employeeChoices.push(rows[i].employee);
      }

      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: employeeChoices,
          },
        ])
        .then((answers) => {
          Employee.add(answers)
            .then(() => {
              const { first_name, last_name } = answers;
              console.log(`Added ${first_name} ${last_name} to the database.`);
            })
            .then(() => {
              main();
            });
        });
    });
  });
}

function updateEmployeeRole() {
  Employee.list().then((rows) => {
    let employeeChoices = [];
    for (i = 0; i < rows.length; i++) {
      employeeChoices.push(rows[i].employee);
    }

    Role.list().then((rows) => {
      let roleChoices = [];
      for (i = 0; i < rows.length; i++) {
        roleChoices.push(rows[i].title);
      }

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee do you want to update?",
            choices: employeeChoices,
          },
          {
            type: "list",
            name: "role",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices,
          },
        ])
        .then((answers) => {
          Employee.updateRole(answers)
            .then(() => {
              const { employee, role } = answers;
              console.log(`Updated ${employee}'s role to ${role}.`);
            })
            .then(() => {
              main();
            });
        });
    });
  });
}

function updateEmployeeManager() {
  Employee.list().then((rows) => {
    let managerChoices = ["None"];
    for (i = 0; i < rows.length; i++) {
      managerChoices.push(rows[i].employee);
    }
    let employeeChoices = managerChoices.filter((value) => {
      return value != "None";
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee do you want to update?",
          choices: employeeChoices,
        },
        {
          type: "list",
          name: "manager",
          message: "Which manager do you want to assign the selected employee?",
          choices: managerChoices,
        },
      ])
      .then((answers) => {
        Employee.updateManager(answers)
          .then(() => {
            const { employee, manager } = answers;
            console.log(`Updated ${employee}'s manager to ${manager}.`);
          })
          .then(() => {
            main();
          });
      });
  });
}

module.exports = main;
