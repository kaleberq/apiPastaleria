'use strict';
var dbConn = require('./../../config/db.config');

var FormaEntrega = function(formaPagamento){
    this.formaEntrega = formaPagamento.formaEntrega;
    this.descricao      = formaPagamento.descricao;
};

FormaEntrega.listarFormaEntrega = function (result) {
    dbConn.query("Select * from formaEntrega", function (err, res) {
      if(err) {
        result(null, err);
      }
      else{
        result(null, res);
      }
    });
};

module.exports= FormaEntrega;