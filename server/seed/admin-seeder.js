let mongoose = require('mongoose');

let User = require('../models/user');
let url = 'localhost:27017/redux-blog'; //local
//var url = process.env.PROD_MONGODB; //heroku

mongoose.connect(url);
mongoose.Promise = require('bluebird');

let newUser = new User();
newUser.username = 'Admin';
newUser.email = 'Admin@gmail.com';
newUser.password = newUser.encryptPassword('123456');
newUser.role = 'admin';


newUser.save(function(err, result){
    if(err){
        return console.log(err);
    }
    console.log('Record created');
    exit();
});


function exit(){
    mongoose.disconnect();
}
