//https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6
//EQkwKhAnUHqZxt9
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
const secret   = 'kjw4589d5f4g2d6';
const jwt      = require('jsonwebtoken');
const Token    = require('./src/models/token.model')
const passport = require('passport');
const cookieSession = require('cookie-session')
//require('./passport-setup');
//const User     = require('./src/models/user.model');

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



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors());

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

// rotas
const userRoutes =     require('./src/routes/user.routes')
const enderecoRoutes = require('./src/routes/endereco.routes')
const salgadoRoutes =   require('./src/routes/salgado.routes')
const formaPagamentoRoutes =   require('./src/routes/formaPagamento.routes')
const encomendaInformacaoRoutes =   require('./src/routes/encomendaInformacao.routes')
const formaEntregaRoutes =   require('./src/routes/formaEntrega.routes')

// configurando a rota
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/endereco', verifyJWT, enderecoRoutes)
app.use('/api/v1/salgado', verifyJWT, salgadoRoutes)
app.use('/api/v1/formaPagamento', verifyJWT, formaPagamentoRoutes)
app.use('/api/v1/formaEntrega', verifyJWT, formaEntregaRoutes)
app.use('/api/v1/encomendaInformacao', verifyJWT, encomendaInformacaoRoutes)

// For an actual app you should configure this with an experation time, better keys, proxy and secure
/* app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))
 */
// Auth middleware that checks if the user is logged in
/* const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
 */
// Initializes passport and passport sessions
/* app.use(passport.initialize());
app.use(passport.session()); */

// Example protected and unprotected routes
/* app.get('/', (req, res) => res.send('Example Home page!'))
app.get('/failed', (req, res) => res.send('You Failed to log in!')) */

// In this route you can see that if the user is logged in u can acess his info in: req.user
/* app.get('/good', isLoggedIn, (req, res) => console.log('nheeee',res)); */

// Auth Routes
/* app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    //console.log('retorno',res);
    User.findById(req.user._json.email, function(err, resp) {
        if (err){
            res.json({auth:false,message:"erro!"});
            console.log('erro');
        }
        else{
            if(!resp){
                res.json({auth:false});

            }else{
                //res.json({auth:true});
            } 
        }
     });
  }
); */
/* 
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
}) */


// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});