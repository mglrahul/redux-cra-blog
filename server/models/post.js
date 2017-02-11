let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Schema =  mongoose.Schema;

let postSchema = new Schema({
    user: {type:Schema.Types.ObjectId, ref:'User'},
    title: {type: String, required: true},
    category: {type:Schema.Types.ObjectId, ref:'Category'},
    content: {type: String, required: true}
}, {timestamps:{}});

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', postSchema);
