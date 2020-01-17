const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const CategorySchema = mongoose.Schema({
    name: { type: String, index: true, required: true, unique: true },
    sort: { type: Number, required: false },
    featured: { type: Boolean, required: true, default: true },
    banner: { type: String, required: false },
    imageurl: { type: String, required: false },
    description: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    products: { type: Array, required: false },
    meta_tag: { type: String, required: false },
    meta_keyword: { type: String, required: false },
    meta_description: { type: String, minlength: 10, required: false },
    created: { type: Date, index: true, default: Date.now },
    updated: { type: Date, index: true, default: Date.now }
});

CategorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('category', CategorySchema);