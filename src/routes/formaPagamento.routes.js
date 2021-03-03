const express = require('express')
const router = express.Router()
const formaPagamentoController =   require('../controllers/formaPagamento.controller');

router.post('/listarFormaPagamento', formaPagamentoController.listarFormaPagamento);
/* router.post('/inserirSalgado', salgadoController.inserirSalgado);
router.post('/listarSalgado', salgadoController.listarSalgado);
router.post('/excluirSalgado', salgadoController.excluirSalgado);
router.post('/buscarSalgado', salgadoController.buscarSalgado);
router.post('/editarSalgado', salgadoController.editarSalgado);
router.post('/listarSalgadoCliente', salgadoController.listarSalgadoCliente); */


module.exports = router