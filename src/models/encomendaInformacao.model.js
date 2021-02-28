'use strict';
var dbConn = require('./../../config/db.config');

var EncomendaInformacao = function(encomendaInformacao){
    this.idEncomenda     = encomendaInformacao.idEncomenda;
    this.valorTotal      = encomendaInformacao.valorTotal;
    this.email           = encomendaInformacao.email;
    this.salgadoPedidos  = encomendaInformacao.salgadosPedido ;
    this.formaPagamento  = encomendaInformacao.formaPagamento;
    this.formaEntrega  = encomendaInformacao.formaEntrega;
    this.dataEncomenda   = encomendaInformacao.dataEncomenda;
    this.dataEntrega     = encomendaInformacao.dataEntrega;
    this.encomendaAndamento = encomendaInformacao.encomendaAndamento;
};

EncomendaInformacao.inserirEncomendaInformacao = function (encomendaInformacao, result) {
  dbConn.query("INSERT INTO encomendaInformacao SET" + ` formaEntrega= `+ encomendaInformacao.formaEntrega +`,valorTotal= `+ encomendaInformacao.valorTotal+ `,email='`+ encomendaInformacao.email+ `',formaPagamento=`+encomendaInformacao.formaPagamento+`,dataEncomenda=sysdate()`+`,encomendaAndamento=`+ 0, function (err, res) {
      if(err) {
          result(err, null);
      }
      else{
        let i;
        for (i = 0; i < encomendaInformacao.salgadoPedidos.length; i++) {
          
          dbConn.query("INSERT INTO pedido SET"+` id=`+encomendaInformacao.salgadoPedidos[i].salgado+`,quantidade=`+encomendaInformacao.salgadoPedidos[i].quantidade +`,idEncomenda=`+ res.insertId, function (err, res) {
            if(err) {
              result(err, null);
            }
          });
        }
        result(null, res);
      }
  });    
};
/* log */
EncomendaInformacao.buscarEncomendaInformacaoSituacao = function (body, result) {
  if(body.email){
    console.log('andamento cliente', body.encomendaAndamento);
    console.log('email cliente', body.email);
    dbConn.query("Select ei.*, DATE_FORMAT(ei.dataEncomenda,'%d/%m/%Y %H:%i:%s') as dataEncomenda, primeiro_nome, telefone, celular from encomendaInformacao ei INNER JOIN user u ON ei.email = u.email where encomendaAndamento = ? and dataEntrega IS NULL and u.email = ?", [body.encomendaAndamento, body.email], function (err, res) {
      if(err) {
        result(null, err);
      }
      else{
        result(null, res);
      }
    });
  }else{
    console.log('andamento pastelaria', body.encomendaAndamento);
    dbConn.query("Select ei.*, DATE_FORMAT(ei.dataEncomenda,'%d/%m/%Y %H:%i:%s') as dataEncomenda, primeiro_nome, telefone, celular from encomendaInformacao ei INNER JOIN user u ON ei.email = u.email where encomendaAndamento = ? and dataEntrega IS NULL", body.encomendaAndamento, function (err, res) {
      if(err) {
        result(null, err);
      }
      else{
        result(null, res);
      }
    });
  }
};
EncomendaInformacao.buscarSalgadosEncomenda = function (id, result) {
  dbConn.query("Select * from pedido p INNER JOIN salgado s ON p.id = s.id where p.idEncomenda = ? ", id, function (err, res) {
  if(err) {
    result(null, err);
  }
  else{
    result(null, res);
  }
  });
};
EncomendaInformacao.updateAndamentoEncomenda = function (data, result) {
  if(data.dataEntrega){
    dbConn.query("UPDATE encomendaInformacao SET encomendaAndamento=?, dataEntrega= sysdate() WHERE idEncomenda = ?", [data.encomendaAndamento, data.idEncomenda], function (err, res) {
      if(err) {
        result(null, err);
      }else{
        result(null, res);
      }
    })
  }else{
    dbConn.query("UPDATE encomendaInformacao SET encomendaAndamento=? WHERE idEncomenda = ?", [data.encomendaAndamento, data.idEncomenda], function (err, res) {
      if(err) {
        result(null, err);
      }else{
        result(null, res);
      }
    })
  }
};
module.exports= EncomendaInformacao;