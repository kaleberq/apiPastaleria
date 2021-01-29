'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var Salgado = function(salgado){
    this.nome    = salgado.nome;
    this.sabor   = salgado.sabor;
    this.tamanho = salgado.tamanho;
    this.tipo    = salgado.tipo;
    this.preco    = salgado.preco;
};

Salgado.inserirSalgado = function (salgado, result) {
    dbConn.query("Select * from SALGADO where nome = ? and sabor = ? and tamanho = ? and tipo = ? ", [salgado.nome, salgado.sabor, salgado.tamanho, salgado.tipo], function (err, res) {
        if(res[0]) {
          result(false, 1);
        }
        else{
          dbConn.query("INSERT INTO SALGADO SET ?", salgado, function (err, res) {
              if(err) {
                  result(err, null);
              }
              else{
                  result(null, res);
              }
          });
        }
      });
};

Salgado.listarSalgado = function (result) {
    dbConn.query("Select * from SALGADO", function (err, res) {
      if(err) {
        result(null, err);
      }
      else{
        result(null, res);
      }
    });
};

module.exports= Salgado;