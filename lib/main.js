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
    ],
  },
];

const main = () => {
  inquirer.prompt(menu).then((answers) => {
    const { action } = answers;

    if (
      action === "Departments" ||
      action === "Roles" ||
      action === "Employees"
    ) {
      console.log("wrong");
    } else {
      execute(action);
    }
  });
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
    case "View all roles":
      Role.all()
        .then((result) => {
          console.log("\n" + cTable.getTable(result));
        })
        .then(() => {
          main();
        });
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
    case "Add a department":
      break;
    case "Add a role":
      break;
    case "Add an employee":
      break;

    case "Update an employee role":
      break;
  }
};

// function execute(answers) {
//   return new Promise((res, rej) => {
//     if (answers.action === "View all departments") {
//       res(Department.allDepartments());
//     }
//   });
//   console.log("ahhhhh");
//   Department.allDepartments();
//   main();
// }

// const execute = new Promise((res, rej) => {
//   switch (answers.action) {
//     case "View all departments":
//       Department.allDepartments();
//       break;
//     case "View all roles":
//       break;
//     case "View all employees":
//       break;
//     case "Add a department":
//       break;
//     case "Add a role":
//       break;
//     case "Add an employee":
//       break;
//     case "Update an employee role":
//       break;
//   }
// }).then(main());

// function execute(answers) {
//   switch (answers.action) {
//     case "View all departments":
//       Department.allDepartments();
//       break;
//     case "View all roles":
//       break;
//     case "View all employees":
//       break;
//     case "Add a department":
//       break;
//     case "Add a role":
//       break;
//     case "Add an employee":
//       break;
//     case "Update an employee role":
//       break;
//   }
// }

module.exports = main;
