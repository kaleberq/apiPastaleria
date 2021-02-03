const express = require('express')
const router = express.Router()
const salgadoController =   require('../controllers/salgado.controller');

router.post('/inserirSalgado', salgadoController.inserirSalgado);
router.post('/listarSalgado', salgadoController.listarSalgado);
router.post('/excluirSalgado', salgadoController.excluirSalgado);
router.post('/buscarSalgado', salgadoController.buscarSalgado);
router.post('/editarSalgado', salgadoController.editarSalgado);
/* router.post('/buscarEndereco', enderecoController.buscarEnderecoUsuario);
router.post('/inserirEndereco', enderecoController.inserirEnderecoUsuario);
router.post('/editarEndereco', enderecoController.editarEnderecoUsuario);
router.post('/excluirEndereco', enderecoController.excluirEnderecoEnderecoUsuario); */

module.exports = router