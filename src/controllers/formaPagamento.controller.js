'use strict';

const FormaPagamento = require('../models/formaPagamento.model');


exports.listarFormaPagamento = (req, res) => {
    FormaPagamento.listarFormaPagamento(function(err, resp) {
    if(resp.length == 0){
      res.send({auth:true, message:'Não há forma de pagamentos cadastrados'});
    }else if(err){
      res.send({auth:false, message:'Erro ao listar as formas de pagamento'});
    }else{
      res.send({auth:true, resp: resp});
    }
  });
} 
