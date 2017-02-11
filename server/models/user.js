let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let bcrypt = require('bcrypt-nodejs');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' }
}, {timestamps: {}});

userSchema.plugin(mongoosePaginate);

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
