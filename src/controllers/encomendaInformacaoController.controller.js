'use strict';
const nodemailer = require('nodemailer');

const EncomendaInformacao = require('../models/encomendaInformacao.model');

exports.inserirEncomendaInformacao = (req, res) => {
  const encomendaInformacaoBody = new EncomendaInformacao(req.body)

/*   res.json({ auth:true, resp:encomendaInformacaoBody }); */
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    EncomendaInformacao.inserirEncomendaInformacao(encomendaInformacaoBody, function(err, resp) {
      console.log('resp', resp);
      if(err){
        console.log(err);
        res.send({auth:false, message:'Erro ao fazer o pedido'});
      }else{
        res.json({auth:true, message:"Pedido feito com sucesso!"});
      }
    }); 
  }  
} 
exports.buscarEncomendaInformacaoSituacao = function(req, res) {
  const encomendaBody = new EncomendaInformacao(req.body);

  EncomendaInformacao.buscarEncomendaInformacaoSituacao(encomendaBody, function(err, resp) {
    if (err){
      res.send(err);
    }
    else{
      res.json({ auth:true, resp:resp });
    }
  });  
};
exports.buscarSalgadosEncomenda = function(req, res) {
  const encomendaBody = new EncomendaInformacao(req.body);

  EncomendaInformacao.buscarSalgadosEncomenda(encomendaBody.idEncomenda, function(err, resp) {
    if (err){
      res.send(err);
    }
    else{
      res.json({ auth:true, resp:resp });
    }
  });  
};
exports.updateAndamentoEncomenda = function(req, res) {
  const encomendaBody = new EncomendaInformacao(req.body);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'salgadosNunes123@gmail.com',
      pass: 'salgadosNunes132'
    }
  });
  
  var mailOptions = {
    from: 'salgadosNunes123@gmail.com',
    to: encomendaBody.email,
    subject: '',
    text: ''
  };
  
  EncomendaInformacao.updateAndamentoEncomenda(encomendaBody, function(err, resp) {
    if (err){
      res.json({ auth:false, message: err });
    }
    else{
      if(encomendaBody.encomendaAndamento == 1){
        res.json({auth:true,message:"Encomenda aceita com sucesso!"}); 
        mailOptions.subject = 'Seu pedido foi aceito';
        mailOptions.text = 'Encaminharemos um novo email quando seu pedido estiver pronto!';
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('email enviado');
          }
        });
      }else if(encomendaBody.encomendaAndamento == 2){
        res.json({auth:true,message:"Encomenda recusada!"}); 
        mailOptions.subject = 'Seu pedido foi recusado';
        mailOptions.text = 'Por algum motivo seu pedido foi recusado.';
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('email enviado');
          }
        });
      }else if(encomendaBody.encomendaAndamento == 3 && encomendaBody.dataEntrega != true){
        res.json({auth:true,message:"Encomenda finalizada!"});
        mailOptions.subject = 'Seu pedido foi finalizado';
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('email enviado');
          }
        });
      }else{
        res.json({auth:true,message:"Encomenda marcada como entregue!"});
        mailOptions.subject = 'Seu pedido foi entregue';
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('email enviado');
          }
        });
      }
    }
  }); 
};
