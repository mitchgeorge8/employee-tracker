const db = require("./db/connection");
const main = require("./lib/main");

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("You are now connected to the Employee Tracker.\n");
  main();
});
