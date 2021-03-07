const express = require('express')
const router = express.Router()
const userController =   require('../controllers/user.controller');
const secret   = 'kjw4589d5f4g2d6';
const jwt      = require('jsonwebtoken');
const Token    = require('../models/token.model');

require('../../passport-setup');



function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    
    Token.findToken(token, function(err, resp) {
        if (err){
            res.send(err);
        }
        else{
            if(resp !== 0){
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

/* router.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2'],
  }))

const isLoggeIn = (req, res, next) => {

    next();
} */




/* router.get('/', (req, res) => res.send('you are not logged in!'));

router.get('/failed', (req, res) => res.send('you failed log in'));

router.get('/good', isLoggeIn, (req, res) => res.send(`welcome mr ${req.email}!`));

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/v1/user/good');
  });

  router.get('/logout', (req, res) => {
      req.session = null;
      req.logout();
      res.redirect('/');
  }) */



router.get('/buscar', verifyJWT, userController.findAll);
// Create a new employee
router.post('/cadastroUsuario', userController.create);
router.post('/login', userController.findById);
router.post('/loginGoogle', userController.findByIdGoogle);
router.post('/logout', userController.logout);
router.post('/buscarDadosUsuario', verifyJWT, userController.buscarDadosUsuario);
router.post('/editarDadosUsuario', verifyJWT, userController.editarDadosUsuario);
router.post('/verificaEmail', userController.verificaEmail);

module.exports = router