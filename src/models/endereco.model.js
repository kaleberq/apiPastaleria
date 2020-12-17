'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var Endereco = function(endereco){
    this.email       = endereco.email;
    this.rua         = endereco.rua;
    this.numero      = endereco.numero;
    this.complemento = endereco.complemento;
    this.cep         = endereco.cep;
    this.cidade      = endereco.cidade;
    this.bairro      = endereco.bairro;
};
Endereco.findById = function (id, result) {
  dbConn.query("Select * from ENDERECO where email = ? ", id, function (err, res) {
  if(err) {
    result(null, err);
  }
  else{
    result(null, res[0]);
  }
  });
};
Endereco.inserirEnderecoUsuario = function (newEmp, result) {
  dbConn.query("INSERT INTO ENDERECO SET ?", newEmp, function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          console.log(res);
          result(null, res);
      }
  });
}; 
Endereco.editarEnderecoUsuario = function (data, result) {
  console.log('chegou aqui', data);
  dbConn.query("UPDATE ENDERECO SET rua=?,numero=?,complemento=?,cep=?,cidade=? WHERE email = ?", [data.rua, data.numero, data.complemento, data.cep, data.cidade, data.email], function (err, res) {
    if(err) {
      result(null, err);
    }else{
      result(null, res);
    }
  })
};
Endereco.excluirEnderecoEnderecoUsuario = function(id, result){
  dbConn.query("DELETE FROM ENDERECO WHERE email = ?", [id], function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
    result(null, res);
  }
  });
}; 
module.exports= Endereco;