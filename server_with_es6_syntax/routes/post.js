import express from 'express';
import Category from '../models/category';
var ObjectId = require('mongodb').ObjectId;

import Post from '../models/post';
import authenticate from '../middleware/authenticate';

let router = express.Router();

router.get('/allCategory', (req, res) => {
    //console.log('allCategory');
    Category.find(function(err, result){
        if(err){
            return res.status(401).json({error: err})
        }else{
            return res.status(200).json(result)
        }
    })
})

router.post('/postSubmit', authenticate, (req, res) => {
    const userData = req.user
    //console.log('router', req.body, userData);
    let newPost = new Post();
    newPost.user = userData._id;
    newPost.title = req.body.title;
    newPost.category = req.body.category;
    newPost.content = req.body.content;

    //console.log(newPost);

    newPost.save(function(err, result){
        if(err){
            //console.log('err', err);
            return res.status(401).json({error: err})
        }else{
            //console.log('result', result);
            return res.status(200).json({response: 'Post has been Created'})
        }
    })
})

router.post('/getSelfPosts', authenticate, (req, res) => {
    const userData = req.user

    let page = (req.body.page) ? req.body.page: 1;
    let perPage= 2;

    let query = {'user': ObjectId(userData._id)}
    let options = {
      sort: 'desc',
      populate: ['user', 'category'],
      limit: perPage,
      page: page
    };

    Post.paginate(query, options, function(err, result) {
      if(err){
          return res.status(401).json({error: err})
      }else{
          res.status(200).json({response: result})
      }
    });
})


router.post('/getAllPosts',  (req, res) => {
    const userData = req.user

    let page = (req.body.page) ? req.body.page: 1;
    let perPage= 2;

    let query = {}
    let options = {
      sort: 'desc',
      populate: ['user', 'category'],
      limit: perPage,
      page: page
    };

    Post.paginate(query, options, function(err, result) {
      if(err){
          return res.status(401).json({error: err})
      }else{
          res.status(200).json({response: result})
      }
    });
})


router.get('/getPostDetail/:postId',  (req, res) => {
    Post.findOne({'_id': ObjectId(req.params.postId)}, function(err, post){
        if(err){
            res.status(200).json({error: err})
        }else {
            res.status(200).json({response: post})
        }
    })
})

router.post('/updatePostDetails', authenticate, (req, res) => {
    const userData = req.user;
    console.log('route', req.body, userData);

    let conditions ={
        '_id': req.body._id
    }

    let update = {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content
    }

    Post.update(conditions, update, function(err, result){
        if(err){
            return res.status(200).json({error: err})
        }else {
            return res.status(200).json({response: 'Post Updated'})
        }
    });
})

router.get('/deletePost/:postId', authenticate, (req, res) => {
    const userData = req.user

    console.log(req.params.postId, userData);

    Post.find({'_id': ObjectId(req.params.postId), user: ObjectId(userData._id)}).remove().exec(function(err, result){
        if(err){
            return res.status(200).json({error: err})
        }else {
            return res.status(200).json({response: 'Post deleted'})
        }
    })
})

export default router;
