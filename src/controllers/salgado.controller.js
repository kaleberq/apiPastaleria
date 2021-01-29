'use strict';

const Salgado = require('../models/salgado.model');

exports.inserirSalgado = (req, res) => {
  const salgadoBody = new Salgado(req.body)
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Salgado.inserirSalgado(salgadoBody, function(err, resp) {
      console.log('resp', resp);
      if (resp == 1){
        res.send({auth:false, message:'Este salgado já foi cadastrado'});
      }else if(err){
        console.log(err);
        res.send({auth:false, message:'Erro ao cadastrar o salgado'});
      }else{
        res.json({auth:true, message:"Salgado cadastrado com sucesso!"});
      }
    });
  }   
} 
exports.listarSalgado = (req, res) => {
  Salgado.listarSalgado(function(err, resp) {
    if(resp.length == 0){
      res.send({auth:true, message:'Não há salgados cadastrados'});
    }else if(err){
      res.send({auth:false, message:'Erro ao listar os salgados'});
    }else{
      res.send({auth:true, resp: resp});
    }
  });
} 
