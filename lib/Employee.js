const db = require("../db/connection");
const cTable = require("console.table");

class Employee {
  static all() {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS employee, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager \
        FROM (employee AS e LEFT OUTER JOIN employee AS m ON e.manager_id = m.id) \
        INNER JOIN role ON e.role_id = role.id \
        INNER JOIN department ON role.department_id = department.id \
        ORDER BY employee";

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
  static add(answers) {
    return new Promise((resolve, reject) => {
      const { first_name, last_name, role, manager } = answers;

      db.promise()
        .query(`SELECT id FROM role WHERE title = '${role}'`)
        .then(([rows]) => {
          let role_id;
          if (!rows.length) {
            role_id = "NULL";
          } else {
            const [{ id }] = rows;
            role_id = id;
          }

          db.promise()
            .query(
              `SELECT id FROM employee WHERE CONCAT(first_name, ' ',last_name) = '${manager}'`
            )
            .then(([rows]) => {
              let manager_id;
              if (!rows.length) {
                manager_id = "NULL";
              } else {
                const [{ id }] = rows;
                manager_id = id;
              }

              const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) \
                VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`;

              db.promise()
                .query(sql)
                .then(() => {
                  resolve();
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static update(answers) {
    return new Promise((resolve, reject) => {
      const { employee, role } = answers;

      db.promise()
        .query(`SELECT id FROM role WHERE title = '${role}'`)
        .then(([rows]) => {
          let role_id;
          if (!rows.length) {
            role_id = "NULL";
          } else {
            const [{ id }] = rows;
            role_id = id;
          }

          const sql = `UPDATE employee \
          SET role_id = ${role_id} \
          WHERE CONCAT(first_name, ' ',last_name) = '${employee}'`;

          db.promise()
            .query(sql)
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static list() {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT CONCAT(first_name, ' ', last_name) AS employee \
      FROM employee";

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
