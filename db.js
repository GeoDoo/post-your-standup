// TODO: setup DB elsewhere
const sqlite3 = require("sqlite3").verbose();
// db.run("CREATE TABLE projects(name text)");

let db = new sqlite3.Database("./app.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
});

db.get(
  `SELECT name FROM projects WHERE name = ?`,
  [`${process.env.PROJECT}`],
  (err, row) => {
    if (err) {
      throw err;
    }

    if (row) {
      savedProject = row.name;
      console.log("inside", savedProject);
    }
  }
);

// db.run("INSERT INTO projects(name) VALUES (?)", selectedProject, function(err) {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log(`Rows inserted ${this.changes}`);
// });

// TODO: fix this
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log("Close the database connection.");
});
