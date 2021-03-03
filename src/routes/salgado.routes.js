const express = require('express')
const router = express.Router()
const salgadoController =   require('../controllers/salgado.controller');

router.post('/inserirSalgado', salgadoController.inserirSalgado);
router.post('/listarSalgado', salgadoController.listarSalgado);
router.post('/excluirSalgado', salgadoController.excluirSalgado);
router.post('/buscarSalgado', salgadoController.buscarSalgado);
router.post('/editarSalgado', salgadoController.editarSalgado);
router.post('/listarSalgadoCliente', salgadoController.listarSalgadoCliente);

module.exports = router