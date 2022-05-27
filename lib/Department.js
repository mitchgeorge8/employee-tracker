const db = require("../db/connection");
const cTable = require("console.table");

class Department {
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * \
      FROM department";

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

module.exports = Department;
