'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'us-cdbr-east-03.cleardb.com',
  user     : 'ba85c24f87f37e',
  password : 'f76ac848',
  database : 'heroku_e1442059138caf3'
});
dbConn.connect(function(err) {
  /* if (err) throw err; */
  console.log("Database Connected!");
});
module.exports = dbConn;