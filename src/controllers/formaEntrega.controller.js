'use strict';

const FormaEntrega = require('../models/formaEntrega.model');


exports.listarFormaEntrega = (req, res) => {
    FormaEntrega.listarFormaEntrega(function(err, resp) {
    if(resp.length == 0){
      res.send({auth:true, message:'Não há forma de entrega cadastrados'});
    }else if(err){
      res.send({auth:false, message:'Erro ao listar as formas de entrega'});
    }else{
      res.send({auth:true, resp: resp});
    }
  });
} 