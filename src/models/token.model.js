'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var Token = function(token){
  this.email         = token.email;
  this.blackList      = token.blackList;
};

Token.createBlackList = function (newEmp, result) {
  dbConn.query("INSERT INTO TOKEN SET ?", newEmp, function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          console.log(res.insertId);
          result(null, res.insertId);
      }
  });
};
Token.findToken = function (id, result) {
  dbConn.query("Select blackList from TOKEN where blackList = ? ", id, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      if(res.length !== 0){
        result(null, 0);
      }else{
        result(null, res);
      }
    }
  });
};
module.exports= Token;