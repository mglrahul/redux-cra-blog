let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    gender: { type: String, required: true },
    country: { type: String, required: true },
    about_us: { type: String, required: true },
    newsletter: { type: String, required: true }
}, {timestamps:{}});

module.exports = mongoose.model('Profile', profileSchema)
