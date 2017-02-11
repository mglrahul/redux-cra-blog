import express from 'express';
import isEmpty from 'lodash/isEmpty';

import authenticate from '../middleware/authenticate';
var ObjectId = require('mongodb').ObjectId;
import Profile from '../models/profile';
import User from '../models/user';
var ObjectId = require('mongodb').ObjectId;

let router = express.Router();

router.get('/getprofile', authenticate, (req, res) => {
    const userData = req.user;
    Profile.findOne({'user': ObjectId(userData._id)}, function(err, user){
        if(err){
            return res.status(400).json({errors: 'no record found'})
        }else{
            return res.status(200).json(user)
        }
    })
});

router.post('/profileUpdate', authenticate, (req, res) => {
    const userData = req.user;

    var query = {
         'user' : userData._id,
         'fname' : req.body.fname,
         'lname' : req.body.lname,
         'gender' : req.body.gender,
         'country' : req.body.country,
         'about_us' : req.body.about_us,
         'newsletter' : req.body.newsletter,
    };

    Profile.findOneAndUpdate({user:ObjectId(userData._id)}, { $set: query} , {upsert:true}, function(err, doc){
        if (err){
            res.status(200).json({error: err})
        }else{
            res.status(200).json({message: 'Profile Record is created'})
        }
    });
})

router.post('/getAllUsers', authenticate, (req, res) => {
    const userData = req.user

    if(userData.role=='admin'){
        let page = (req.body.page) ? req.body.page: 1;
        let perPage= 2;

        let query = {}
        let options = {
          sort: 'desc',
          limit: perPage,
          page: page
        };

        User.paginate(query, options, function(err, result) {
          if(err){
              res.status(200).json({error: err})
          }else{
              res.status(200).json({response: result})
          }
        });
    }else{
        res.status(401).json({error: 'Unauthenticated access'})
    }
})

router.post('/getUserDetail', authenticate, (req, res) => {
    const userData = req.userData
    const userId = req.body.id;
    Profile.findOne({'user': ObjectId(userId)}, function(err, result){
        if(err){
            res.status(200).json({error: err})
        }else{
            res.status(200).json({response: result})
        }
    })
})
export default router;
