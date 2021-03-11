"use strict";
const dbConn = require("./db.connection");

// const mysql = require("mysql");
// //local mysql db connection
// const dbConn = mysql.createConnection({
//   host: "us-cdbr-east-03.cleardb.com",
//   user: "ba85c24f87f37e",
//   password: "f76ac848",
//   database: "heroku_e1442059138caf3",
// });
//
// dbConn.connect(function (res, err) {
//   if (res) {
//     console.log(res);
//   } else {
//     console.log(err);
//   }
//   console.log("Database Connected!");
// });

class DbConn {
  query(query, args = undefined, fn) {
    let conn;

    if (args) conn = dbConn.raw(query, args);
    else conn = dbConn.raw(query);

    conn
      .then(([result]) => {
        fn(undefined, result);
      })
      .catch((err) => {
        fn(err, undefined);
      });
  }
}

module.exports = new DbConn();
