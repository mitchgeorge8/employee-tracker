const db = require("../db/connection");
const cTable = require("console.table");

class Role {
  static all() {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT role.id, role.title, department.name AS department, role.salary \
        FROM role INNER JOIN department ON role.department_id = department.id \
        ORDER BY department, salary DESC";

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
  static add(role, salary, department) {
    return new Promise((resolve, reject) => {
      db.promise()
        .query(`SELECT id FROM department WHERE name = '${department}'`)
        .then(([rows]) => {
          let department_id;
          if (!rows.length) {
            department_id = "NULL";
          } else {
            const [{ id }] = rows;
            department_id = id;
          }

          const sql = `INSERT INTO role (title, salary, department_id) \
          VALUES ('${role}', ${salary}, ${department_id})`;

          db.promise()
            .query(sql)
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        });
    });
  }
  static list() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT title \
      FROM role \
      ORDER BY title";

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
