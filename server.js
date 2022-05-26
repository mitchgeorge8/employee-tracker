const db = require("./db/connection");
const Prompt = require("./lib/Prompt");

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("You are now connected to the Employee Tracker.");
  Prompt.menu();
});
