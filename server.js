const sslRedirect = require('heroku-ssl-redirect');
const express = require("express");
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const users = require('./routes/users');
const pickupLines = require('./routes/pickupLines');
const fbLogin = require('./routes/fbLogin');
const config = require('./config/database');

const PORT = process.env.PORT || 3001;
const app = express();

// Create server instance
const server = http.createServer(app);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/flashcards"
);

mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

// SSL Redirect
app.use(sslRedirect());

// Set Static Folder
app.use(express.static("client/build"));

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/pickuplines', pickupLines);
app.use('/fbLogin', fbLogin);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`)
});