const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User     = require('./src/models/user.model');

passport.serializeUser(function(user, done) {
    done(null, user._json);
});
  
passport.deserializeUser(function(user, done) {
  /*
  Instead of user this function usually recives the id 
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  */
 done(null, 'false');
/*   User.findById(user.email, function(err, resp) {
    if (err){
      res.send(err);
    }
    else{
        if(!resp){
          done(null, 'false');
        }else{
          done(null, 'true');
        } 
      }
    });  */
});

passport.use(new GoogleStrategy({
    clientID: "1098782377685-3k0h8i8n34pct3hpf11ecb6i309a77q8.apps.googleusercontent.com",
    clientSecret: "DdgKUD7sVVUZOCKhj288CrPO",
    callbackURL: "http://localhost:5000/google/callback",
    proxy: true
  },
  function(accessToken, refreshToken, profile, done) {
      //depois verificar se o usuario esta cadastrado no meu banco
/*     User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    }); */
    return done(null, profile);
  }
));