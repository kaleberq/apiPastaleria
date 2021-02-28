'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var Salgado = function(salgado){
    this.id               = salgado.id;
    this.nome             = salgado.nome;
    this.sabor            = salgado.sabor;
    this.tamanho          = salgado.tamanho;
    this.tipo             = salgado.tipo;
    this.preco            = salgado.preco;
    this.disponibilidade = salgado.disponibilidade;
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
Salgado.excluirSalgado = function(id, result){
  dbConn.query("DELETE FROM SALGADO WHERE id = ?", [id], function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
    result(null, res);
  }
  });
}; 
Salgado.buscarSalgado = function(id, result){
  dbConn.query("SELECT * FROM SALGADO WHERE id = ?", [id], function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
    result(null, res[0]);
  }
  });
}; 
Salgado.editarSalgado = function (data, result) {
  dbConn.query("UPDATE SALGADO SET nome=?,sabor=?,tamanho=?,tipo=?,preco=?,disponibilidade=? WHERE id = ?", [data.nome, data.sabor, data.tamanho, data.tipo, data.preco, data.disponibilidade, data.id], function (err, res) {
    if(err) {
      result(null, err);
    }else{
      result(null, res);
    }
  })
};
Salgado.listarSalgadoCliente = function (result) {
  dbConn.query("Select * from SALGADO WHERE DISPONIBILIDADE = 1", function (err, res) {
    if(err) {
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
};
module.exports= Salgado;