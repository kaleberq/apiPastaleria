'use strict';
//https://dev.to/uddeshjain/authentication-with-google-in-nodejs-1op5
const User     = require('../models/user.model');
const Token    = require('../models/token.model')
const jwt      = require('jsonwebtoken');
const secret   = 'kjw4589d5f4g2d6';


exports.findAll = function(req, res) {
  console.log(req.userId + 'fez esta chamada!')
  User.findAll(function(err, user) {
        console.log('controller')
        if (err)
        res.send(err);
        console.log('res', user);
        res.send(user);
    });
};
exports.create = function(req, res) {
    const new_use = new User(req.body);
    console.log('corpo', new_use);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
      console.log(new_use.email);
      User.findById(new_use.email, function(err, resp) {
        if (err){
          res.send(err);
        }
        else{
          if(resp.length == 0){
            User.create(new_use, function(err, resposta) {
              if(resposta){
                res.json({auth:true,message:"Usuário cadastrado com sucesso!"}); 
              }else{
                res.json({auth:false,message:"Erro ao cadastrar!"}); 
              }
                 
            })
          }else{
            res.json({ auth:false, message: 'Essa conta já está cadastrada'});
          } 
        }
      }); 
    } 
};
exports.findById = function(req, res) {
  const userBody = new User(req.body);
  console.log('userBody', userBody.email);
  
  User.findById(userBody.email, function(err, resp) {
    if (err){
      res.send(err);
    }
    else{
      if(resp.length == 0){
        res.json({ auth:false, message: 'Esse email não existe'});
      }else if(resp[0].senha != userBody.senha){
        res.json({ auth:false, message: 'Senha incorreta' });
      }else{
        const token = jwt.sign({userId: resp[0].email}, secret, {expiresIn: 300})
        res.json({ auth:true, token: token });
      } 
      //res.json(resp[0].senha);
    }
  }); 
};
exports.logout = (req, res) => {
  const new_black_list = new Token(req.body);
    console.log('corpo', new_black_list);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
      Token.createBlackList(new_black_list, function(err, user) {
        if (err){
          res.send(err);
        }else{
          res.json({auth:true,message:"BackList added successfully!"});
        }     
      });
    }
}
exports.buscarDadosUsuario = function(req, res) {
  const userBody = new User(req.body);
  console.log('userBody', userBody.email);
  
  User.findById(userBody.email, function(err, resp) {
    if (err){
      res.send(err);
    }
    else{
      if(resp.length == 0){
        res.json({ auth:false, message: 'Esse cadastro não existe'});
      }else{
        res.json({ auth:true, resp: resp });
      } 
      //res.json(resp[0].senha);
    }
  }); 
};
/*
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Employee.update(req.params.id, new Employee(req.body), function(err, employee) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'Employee successfully updated' });
});
}
};
exports.delete = function(req, res) {
Employee.delete( req.params.id, function(err, employee) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'Employee successfully deleted' });
}); 
};*/