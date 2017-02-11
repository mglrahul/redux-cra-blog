const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('localhost:27017/redux-blog');
mongoose.Promise = require('bluebird');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(bodyParser.json());

const auth = require('./routes/auth');
const users = require('./routes/users');
const bodpostyParser = require('./routes/post');

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/post', post);

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
