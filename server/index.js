import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
var mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://kabiragarwal71:kabiragarwal71@ds145649.mlab.com:45649/redux-blog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected!');
});

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
