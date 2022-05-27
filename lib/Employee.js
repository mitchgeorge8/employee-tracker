const db = require("../db/connection");
const cTable = require("console.table");

class Employee {
  static all() {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS employee, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager \
        FROM (employee AS e LEFT OUTER JOIN employee AS m ON e.manager_id = m.id) \
        INNER JOIN role ON e.role_id = role.id \
        INNER JOIN department ON role.department_id = department.id;";

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
