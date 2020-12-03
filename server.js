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

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors());

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// rotas
const userRoutes = require('./src/routes/user.routes')
const enderecoRoutes = require('./src/routes/endereco.routes')

// configurando a rota
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/endereco', verifyJWT, enderecoRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});