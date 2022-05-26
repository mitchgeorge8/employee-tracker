const db = require("../db/connection");
const cTable = require("console.table");

class Department {
  static allDepartments() {
    const sql = `SELECT name AS Departments FROM department`;

    db.promise()
      .query(sql)
      .then(([rows]) => {
        console.log("\n");
        console.table(rows);
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = Department;
