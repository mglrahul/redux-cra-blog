import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
var mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('localhost:27017/redux-blog');
mongoose.Promise = require('bluebird');

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(bodyParser.json());

import auth from './routes/auth';
import users from './routes/users';
import post from './routes/post';

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/post', post);


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
