const db = require("../db/connection");

class Query {
  static allDepartments() {
    const sql = `SELECT name FROM departments`;

    db.promise().query(sql, (err, result) => {
      if (err) {
        return err;
      }
      return result;
    });
  }

  static allRoles() {}

  static allEmployees() {}

  static addDepartment(body, models) {}

  static addRole(body, models) {}

  static addEmployee(body, models) {}

  static updateRole(body, models) {}

  static updateManager(body, models) {}

  static employeesByManager(body, models) {}

  static employeesByDepartment(body, models) {}

  static deleteDepartment(body, models) {}

  static deleteRole(body, models) {}

  static deleteEmployee(body, models) {}

  static departmentBudget(body, models) {}
}

module.exports = Query;
