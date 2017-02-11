let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let catSchema = new Schema({
    name: { type: String},
    slug: {type: String}
})

module.exports = mongoose.model('Category', catSchema);
