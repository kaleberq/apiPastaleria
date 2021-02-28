'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var FormaPagamento = function(formaPagamento){
    this.formaPagamento = formaPagamento.formaPagamento;
    this.descricao      = formaPagamento.descricao;
};

FormaPagamento.listarFormaPagamento = function (result) {
    dbConn.query("Select * from formaPagamento", function (err, res) {
      if(err) {
        result(null, err);
      }
      else{
        result(null, res);
      }
    });
};

module.exports= FormaPagamento;