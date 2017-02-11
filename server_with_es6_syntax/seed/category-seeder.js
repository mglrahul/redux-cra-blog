let mongoose = require('mongoose');

let Category = require('../models/category');

let url = 'localhost:27017/redux-blog';
mongoose.connect(url);

mongoose.Promise = require('bluebird');

let newCategory = [
    new Category({name:'First Type', slug:'first_type'}),
    new Category({name:'Second Type', slug:'second_type'}),
    new Category({name:'Third Type', slug:'third_type'}),
    new Category({name:'Fourth Type', slug:'fourth_type'})
];

let done =0;
for(i=0; i<newCategory.length; i++){
    newCategory[i].save(function(err, result){
        if(err){
             console.log('error', err);
        }else{
            done++
            if(newCategory.length ===done){
                console.log('category data seeded');
                exit();
            }
        }
    })
}

function exit(){
    mongoose.disconnect();
}
