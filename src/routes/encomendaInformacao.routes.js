const express = require('express')
const router = express.Router()
const encomendaInformacaoController = require('../controllers/encomendaInformacaoController.controller');

router.post('/buscarEncomendaInformacaoSituacao', encomendaInformacaoController.buscarEncomendaInformacaoSituacao); 
router.post('/inserirEncomendaInformacao', encomendaInformacaoController.inserirEncomendaInformacao);
router.post('/buscarSalgadosEncomenda', encomendaInformacaoController.buscarSalgadosEncomenda);
router.post('/updateAndamentoEncomenda', encomendaInformacaoController.updateAndamentoEncomenda);
/* router.post('/editarEndereco', enderecoController.editarEnderecoUsuario);
router.post('/excluirEndereco', enderecoController.excluirEnderecoEnderecoUsuario); */

module.exports = router