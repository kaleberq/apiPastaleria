const express = require('express')
const router = express.Router()
const formaEntregaController =   require('../controllers/formaEntrega.controller');

router.post('/listarFormaEntrega', formaEntregaController.listarFormaEntrega);
/* router.post('/inserirSalgado', salgadoController.inserirSalgado);
router.post('/listarSalgado', salgadoController.listarSalgado);
router.post('/excluirSalgado', salgadoController.excluirSalgado);
router.post('/buscarSalgado', salgadoController.buscarSalgado);
router.post('/editarSalgado', salgadoController.editarSalgado);
router.post('/listarSalgadoCliente', salgadoController.listarSalgadoCliente); */


module.exports = router