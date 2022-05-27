const db = require("../db/connection");
const cTable = require("console.table");

class Role {
  static all() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`;
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

module.exports = Role;
