const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const BlogCategorySchema = mongoose.Schema({
    name: { type: String, index: true, required: true, unique: true },
    sort: { type: Number, required: false, default: 0 },
    featured: { type: Boolean, required: true, default: true },
    banner: { type: String, required: false },
    imageurl: { type: String, required: false },
    description: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    categoryid: { type: [Schema.Types.ObjectId], required: false },
    meta_tag: { type: String, required: false, default: 'title' },
    meta_keyword: { type: String, required: false, default: 'keyword' },
    meta_description: { type: String, minlength: 10, required: false, default: 'description' },
    userid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    updated: { type: Date, index: true, default: Date.now }
});

BlogCategorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('blogcategory', BlogCategorySchema);