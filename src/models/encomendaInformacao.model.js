'use strict';
var dbConn = require('./../../config/db.config');

var EncomendaInformacao = function(encomendaInformacao){
    this.idEncomenda        = encomendaInformacao.idEncomenda;
    this.valorTotal         = encomendaInformacao.valorTotal;
    this.email              = encomendaInformacao.email;
    this.salgadoPedidos     = encomendaInformacao.salgadosPedido ;
    this.formaPagamento     = encomendaInformacao.formaPagamento;
    this.formaEntrega       = encomendaInformacao.formaEntrega;
    this.dataEncomenda      = encomendaInformacao.dataEncomenda;
    this.dataEntrega        = encomendaInformacao.dataEntrega;
    this.encomendaAndamento = encomendaInformacao.encomendaAndamento;
    this.mes                = encomendaInformacao.mes;
    this.ano                = encomendaInformacao.ano;
};

EncomendaInformacao.inserirEncomendaInformacao = function (encomendaInformacao, result) {
  dbConn.query("INSERT INTO encomendaInformacao SET" + ` formaEntrega= `+ encomendaInformacao.formaEntrega +`,valorTotal= `+ encomendaInformacao.valorTotal+ `,email='`+ encomendaInformacao.email+ `',formaPagamento=`+encomendaInformacao.formaPagamento+`,dataEncomenda=sysdate()`+`,dataEncomendaMesAno=sysdate()`+`,encomendaAndamento=`+ 0, function (err, res) {
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
EncomendaInformacao.buscarEncomendaInformacaoRelatorio = async function (body, result) {
  let data = {
    aceitas: 0,
    recusadas: 0,
    feitas: 0,
    entregues: 0,
    totalSalgadosVendidos: 0
  }
  
  dbConn.query("SELECT COUNT(Ei.encomendaAndamento) as quantidadeEncomendasAceitas FROM encomendaInformacao Ei where Ei.encomendaAndamento = 1 and Month(Ei.dataEncomendaMesAno) = ? and YEAR(Ei.dataEncomendaMesAno) = ? and dataEntrega IS NULL", [body.mes, body.ano], function (err, res1) {
    if(err) {
      result(null, err);
    }
    else{
      data.aceitas = res1[0];
      dbConn.query("SELECT COUNT(Ei.encomendaAndamento) as quantidadeEncomendasRecusadas FROM encomendaInformacao Ei where Ei.encomendaAndamento = 2 and Month(Ei.dataEncomendaMesAno) = ? and YEAR(Ei.dataEncomendaMesAno) = ? and dataEntrega IS NULL", [body.mes, body.ano], function (err, res2) {
        if(err) {
          result(null, err);
        }
        else{
          data.recusadas = res2[0];
          dbConn.query("SELECT COUNT(Ei.encomendaAndamento) as quantidadeEncomendasFeitas FROM encomendaInformacao Ei where Ei.encomendaAndamento = 3 and Month(Ei.dataEncomendaMesAno) = ? and YEAR(Ei.dataEncomendaMesAno) = ? and dataEntrega IS NULL", [body.mes, body.ano], function (err, res3) {
            if(err) {
              result(null, err);
            }
            else{
              data.feitas = res3[0];
              dbConn.query("SELECT COUNT(Ei.encomendaAndamento) as quantidadeEncomendasEntregues FROM encomendaInformacao Ei where Ei.encomendaAndamento = 3 and Month(Ei.dataEncomendaMesAno) = ? and YEAR(Ei.dataEncomendaMesAno) = ? and dataEntrega IS NOT NULL", [body.mes, body.ano], function (err, res4) {
                if(err) {
                  result(null, err);
                }
                else{
                  data.entregues = res4[0];
                  dbConn.query("SELECT P.ID AS SALGADO, P.QUANTIDADE FROM PEDIDO P INNER JOIN encomendaInformacao EI ON EI.IDENCOMENDA = P.IDENCOMENDA where Ei.encomendaAndamento = 3 and Month(Ei.dataEncomendaMesAno) = ? and YEAR(Ei.dataEncomendaMesAno) = ?", [body.mes, body.ano], function (err, res5) {
                    if(err) {
                      result(null, err);
                    }
                    else{
                      var i;
                      for (i = 0; i < res5.length; i++) {
                        data.totalSalgadosVendidos = data.totalSalgadosVendidos + res5[i].QUANTIDADE;
                      }
                      result(null, data);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};
module.exports= EncomendaInformacao;