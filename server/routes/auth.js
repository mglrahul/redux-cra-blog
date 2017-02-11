import express from 'express';
import isEmpty from 'lodash/isEmpty';

import signinValidations from '../common/validations/signup' ;
import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../common/config';

let router = express.Router();

function validateSignin(data, signinValidations){
    let {errors} = signinValidations(data)

    return Promise.all([
        User.find({'username': data.username}, function(err, user){
            if(!isEmpty(user)) errors.username = 'There is such a user with this username';
        }),
        User.find({'email': data.email}, function(err, user){
            if(!isEmpty(user)) errors.email = 'There is such a user with this email';
        }),
    ]).then(() => {
        return {
            errors,
            isValid: isEmpty(errors)
        };
    });
}

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    let errors = {}

    if(!email){
        errors = 'Email is required'
    }else if(!password){
        errors = 'Password is required'
    }

    if(isEmpty(errors)){
        User.findOne({'email': email}, function(err, user){
            if(err){
                res.status(400).json({errors: err})
            }else if(isEmpty(user)){
                res.status(400).json({errors: 'No record found!'})
            }else if(!isEmpty(user)){
                if(user.validPassword(password)){
                    const token = jwt.sign({
                        role: user.role,
                        _id: user._id.toString(),
                        username: user.username,
                        email: user.email
                    }, config.jwtSecret)
                    res.status(200).json({token})
                }else {
                    res.status(400).json({errors: 'Password does not match'})
                }
            }
        })
    }else{
        res.status(400).json({errors: errors})
    }
})

router.post('/signup', (req, res) => {
    validateSignin(req.body, signinValidations).then(({errors, isValid}) => {
        if(!isValid){
            return res.status(400).json({errors: errors})
        }else{
            let createUser = new User();
            const { username, email, password } = req.body
            const encryptPassword = createUser.encryptPassword(password);

            createUser.username = username;
            createUser.email = email;
            createUser.password = encryptPassword;

            createUser.save(function(error, user){
                if(error){
                    res.status(400).json({errors: error})
                }else{
                    return res.status(200).json({success: 'record is created'})
                }
            })
        }
    })
})

export default router;
