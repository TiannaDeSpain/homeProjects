const express = require('express');
const db = require('./config/mongodb');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors')


const port = process.env.PORT || 8080;
const app = express()

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret" ,
    resave: false ,
    saveUninitialized: true ,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers', 
      'Orgin, X-Requested-With, Content-Type, Accept, Z-key, Autorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods', 
      'POST, GET, PUT, DELETE, PATCH, OPTIONS'
    )
    next();
  })  
  .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']}))
  .use(cors({orgin: '*'}))
  .use('/', require('./routes'))

  passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, RefreshToken, profile, done) {
    return done(null, profile);
  }
  ));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => ( res.send(req.session.user != undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')));

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

db.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
