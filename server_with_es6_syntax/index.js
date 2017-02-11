import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
var mongoose = require('mongoose');

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js';


let app = express();

mongoose.connect('localhost:27017/redux-blog');
mongoose.Promise = require('bluebird');

app.use(bodyParser.json());

import auth from './routes/auth';
import users from './routes/users';
import post from './routes/post';

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/post', post);

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));


app.get('/*', (req, res) => {
    //res.send('hello world');
    res.sendFile(path.join(__dirname, './index.html'));
});
app.listen(3000, ()=> console.log('Running on localhost:3000'))
