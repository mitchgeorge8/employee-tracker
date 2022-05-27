const db = require("../db/connection");
const cTable = require("console.table");

class Employee {
  static all() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT CONCAT(employee.first_name, " ", employee.last_name) AS employee, role.title, CONCAT(employee.first_name, " ", employee.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id`;
      db.promise()
        .query(sql)
        .then(([rows]) => {
          resolve(rows);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = Employee;
