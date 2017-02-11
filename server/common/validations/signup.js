const validator = require('validator');
const trim = require('lodash/trim');
const isEmpty = require('lodash/isEmpty');

function validateInput(data){
    let errors = {};

    if(!data.username || trim(data.username)==0){
        errors.username = 'Username is required';
    }
    if(!data.email){
        errors.email = 'Email is required';
    }
    if(data.email && !validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }
    if(!data.password){
        errors.password = 'Password is required';
    }
    if(!data.confirm_password){
        errors.confirm_password = 'Confirm Password is required';
    }
    if(data.password && data.confirm_password && !validator.equals(data.password, data.confirm_password)){
        errors.confirm_password = 'Passwords must match';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports.validateInput = validateInput;
