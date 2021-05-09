
const Sequelize = require("sequelize-cockroachdb");
// For secure connection:
//const fs = require('fs');

// Connect to CockroachDB through Sequelize.
var sequelize = new Sequelize({
  dialect: "postgres",
  username: "max",
  password: "roach",
  host: "localhost",
  port: 26257,
  database: "bank",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      // For secure connection:
      /*ca: fs.readFileSync('certs/ca.crt')
                .toString()*/
    },
  },
  logging: false,
});

// stores code snippet from each cell
const Cell = sequelize.define("Cell", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  runtime: {
    type: Sequelize.ENUM({values: ["Python", "R", "Julia", "Rust", "Bash"]})
  },
  code: {
    type: Sequelize.TEXT
  }
});

// Create the "Cell" table
Cell.sync({
  force: true,
}).then(() => {
    // Inserting dummy data
    return Account.bulkCreate([
      {
        id: 1,
        runtime: "Rust",
        cell: "use std::env; fn main() { let x: Vec<String> = env::args().collect(); println!(\"{:?}\", x); }"
      },
      {
        id: 2,
        runtime: "Bash",
        cell: "ls -1Fa"
      },
    ]);
  }).then(function () {
    // Get all stored code cells
    return Account.findAll();
  }).then(function (accounts) {
    // Print the code
    accounts.forEach(function (account) {
      console.log(account.id + " " + account.balance);
    });
    process.exit(0);
  }).catch(function (err) {
    console.error("error: " + err.message);
    process.exit(1);
  });
