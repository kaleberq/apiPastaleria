'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var User = function(user){
  this.primeiro_nome = user.primeiro_nome;
  this.sobrenome     = user.sobrenome;
  this.email         = user.email;
  this.telefone      = user.telefone;
  this.celular       = user.celular;
  this.cpf           = user.cpf;
  this.senha         = user.senha;
  this.tipo          = user.tipo;
};
User.create = function (newEmp, result) {
    dbConn.query("INSERT INTO USER SET ?", newEmp, function (err, res) {
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
User.findById = function (id, result) {
  dbConn.query("Select * from USER where email = ? ", id, function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(null, err);
  }
  else{
    result(null, res[0]);
  }
  });
}; 
 
User.findAll = function (result) {
    dbConn.query("SELECT * FROM USER", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('user : ', res);
            result(null, res);
        }
    });
};
User.editarDadosUsuario = function (data, result) {
  console.log('chegou aqui', data.email);
  dbConn.query("UPDATE USER SET primeiro_nome=?,sobrenome=?,celular=?,telefone=?,senha=? WHERE email = ?", [data.primeiro_nome, data.sobrenome, data.celular, data.telefone, data.senha, data.email], function (err, res) {
    if(err) {
      result(null, err);
    }else{
      result(null, res);
    }
  })
};
/* Employee.update = function(id, employee, result){
dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name,employee.last_name,employee.email,employee.phone,employee.organization,employee.designation,employee.salary, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Employee.delete = function(id, result){
dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
}; */
module.exports= User;