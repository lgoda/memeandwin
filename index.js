const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);




//clientId  447678932910-qa17qdgf39ihs497la85f4ifgev8o6g8.apps.googleusercontent.com
//client secret 6iKPr5hNDiPaBYhBUtOew-IZ

const PORT = process.env.PORT || 5000;

app.listen(PORT);
