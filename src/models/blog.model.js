const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const BlogSchema = mongoose.Schema({
    code: { type: String, required: true, default: '' },
    title: { type: String, required: true },
    postedby: { type: String, required: false },
    imageurl: { type: String, required: false, default: 'banner/1585935825413laundry.jpg' },
    author: { type: String, required: false, default: 'admin' },
    categoryid: { type: String, required: false },
    category: { type: String, required: false },
    description: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true },
    status: { type: Boolean, required: true, default: true },
    likes: { type: [String], required: false, default: [] },
    views: { type: [String], required: false, default: [] },
    bookmark: { type: [String], required: false, default: [] },
    meta_tag: { type: String, required: false },
    meta_keyword: { type: String, required: false },
    meta_description: { type: String, minlength: 10, required: false },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    updated: { type: Date, index: true, default: Date.now }
});

BlogSchema.plugin(uniqueValidator);

module.exports = mongoose.model('blog', BlogSchema);