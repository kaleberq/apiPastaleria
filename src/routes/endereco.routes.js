const express = require('express')
const router = express.Router()
const enderecoController =   require('../controllers/endereco.controller');

router.post('/buscarEndereco', enderecoController.buscarEnderecoUsuario);
router.post('/inserirEndereco', enderecoController.inserirEnderecoUsuario);
router.post('/editarEndereco', enderecoController.editarEnderecoUsuario);
router.post('/excluirEndereco', enderecoController.excluirEnderecoEnderecoUsuario);

module.exports = router