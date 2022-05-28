const inquirer = require("inquirer");
const TreePrompt = require("inquirer-tree-prompt");
inquirer.registerPrompt("tree", TreePrompt);
const Department = require("./Department");
const Role = require("./Role");
const Employee = require("./Employee");
const cTable = require("console.table");

// const menu = {
//   type: "list",
//   name: "action",
//   message: "What would you like to do?",
//   choices: [
//     "View all departments",
//     "View all roles",
//     "View all employees",
//     "Add a department",
//     "Add a role",
//     "Add an employee",
//     "Update an employee role",
//     "Exit",
//   ],
// };

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
          "Add an employee",
          "Update an employee's role",
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

const main = () => {
  inquirer.prompt(menu).then((answers) => {
    const { action } = answers;
    execute(action);
  });
};

const followUp = (action) => {
  if (action === "Add a department") {
    inquirer
      .prompt({
        type: "input",
        name: "department",
        message: "What is the name of the department?",
      })
      .then((answers) => {
        const { department } = answers;
        return department;
      });
  }
};

const execute = (action) => {
  switch (action) {
    case "View all departments":
      Department.all()
        .then((result) => {
          console.log("\n" + cTable.getTable(result));
        })
        .then(() => {
          main();
        });
      break;
    case "Add a department":
      const department = "test";
      Department.add(department)
        .then(() => {
          console.log(`Added ${department} to the database.`);
        })
        .then(() => {
          main();
        });
      break;
    case "View all roles":
      Role.all()
        .then((result) => {
          console.log("\n" + cTable.getTable(result));
        })
        .then(() => {
          main();
        });
      break;
    case "Add a role":
      break;
    case "View all employees":
      Employee.all()
        .then((result) => {
          console.log("\n" + cTable.getTable(result));
        })
        .then(() => {
          main();
        });
      break;
    case "Add an employee":
      break;
    case "Update an employee role":
      break;
    case "Exit":
      console.log("Press Ctrl+C to exit.");
      break;
  }
};

module.exports = main;
