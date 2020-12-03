const express = require('express')
const router = express.Router()
const enderecoController =   require('../controllers/endereco.controller');



/* 
router.get('/buscar', userController.findAll);
// Create a new employee
router.post('/cadastroUsuario', userController.create);
router.post('/login', userController.findById);
router.post('/logout', userController.logout); */
router.post('/buscarEndereco', enderecoController.buscarEnderecoUsuario);
/* router.post('/editarDadosUsuario', userController.editarDadosUsuario); */

module.exports = router