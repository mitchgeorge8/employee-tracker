const db = require("../db/connection");
const cTable = require("console.table");

class Department {
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * \
      FROM department \
      ORDER BY name";

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
  static add(department) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO department (name) \
          VALUES ('${department}')`;

      db.promise()
        .query(sql)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static list() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT name \
      FROM department \
      ORDER BY name";

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
