const express = require('express')
const router = express.Router()
const userController =   require('../controllers/user.controller');
const secret   = 'kjw4589d5f4g2d6';
const jwt      = require('jsonwebtoken');
const Token    = require('../models/token.model')

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    
    Token.findToken(token, function(err, resp) {
        if (err){
            res.send(err);
        }
        else{
            if(resp !== 0){
                console.log('esse token não existe'),
                jwt.verify(token, secret, (err, decoded) => {
                    if(err){
                        res.status(401).end();
                    }else{
                        req.userId = decoded.userId;
                        next();
                    }
                })
            }else{
                console.log('esse token existe'),
                res.status(401).end();
            }
        }
    }); 
}


router.get('/buscar', verifyJWT, userController.findAll);
// Create a new employee
router.post('/cadastroUsuario', userController.create);
router.post('/login', userController.findById);
router.post('/logout', userController.logout);
router.get('/buscarDadosUsuario', verifyJWT, userController.buscarDadosUsuario);
// Retrieve a single employee with id
//router.get('/:id', userController.findById);
// Update a employee with id
//router.put('/:id', userController.update);
// Delete a employee with id
//router.delete('/:id', userController.delete);
module.exports = router