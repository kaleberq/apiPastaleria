'use strict';
//https://dev.to/uddeshjain/authentication-with-google-in-nodejs-1op5
//const Endereco     = require('../models/Endereco.model');
//const Token    = require('../models/token.model')
const Endereco     = require('../models/endereco.model');
const jwt      = require('jsonwebtoken');
const secret   = 'kjw4589d5f4g2d6';

exports.buscarEnderecoUsuario = function(req, res) {
  const enderecoBody = new Endereco(req.body);
  
  Endereco.findById(enderecoBody.email, function(err, resp) {
    if (err){
      res.send(err);
    }
    else{
      if(resp){
        res.json({ auth:true, resp:resp });
      }else{
        res.json({ auth:false, message: 'Não há endereço cadastrado, Cadastre um endereço para que possamos entregalo em sua residencia!'});
      } 
    }
  });  
};
exports.inserirEnderecoUsuario = (req, res) => {
  const enderecoBody = new Endereco(req.body)
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Endereco.inserirEnderecoUsuario(enderecoBody, function(err, Endereco) {
      if (err){
        res.send({auth:false,message:err});
      }else{
        res.json({auth:true,message:"Endereço cadastrado com sucesso!"});
      }     
    });
  }  
} 
exports.editarEnderecoUsuario = function(req, res) {
  const enderecoBody = new Endereco(req.body);

  Endereco.editarEnderecoUsuario(enderecoBody, function(err, resp) {
    if (err){
      res.json({ auth:false, message: err });
    }
    else{
      res.json({auth:true,message:"Endereço editado com sucesso!"}); 
    }
  }); 
};
exports.excluirEnderecoEnderecoUsuario = function(req, res) {
  const enderecoBody = new Endereco(req.body);
  Endereco.excluirEnderecoEnderecoUsuario( enderecoBody.email, function(err, resp) {
    if (err){
      res.json({ auth:false, message: err });
    }
    else{
      res.json({auth:true,message:"Endereço excluido com sucesso!"}); 
    }
  }); 
};