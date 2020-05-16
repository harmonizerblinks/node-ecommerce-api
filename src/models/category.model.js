const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const ImageSchema = mongoose.Schema({
    imageurl: { type: String, required: false, default: '' },
    banner: { type: String, required: false, default: '' },
    created: { type: Date, index: true, default: Date.now },
    updated: { type: Date, index: true, default: Date.now }
});

const CategorySchema = mongoose.Schema({
    name: { type: String, index: true, required: true, unique: true },
    sort: { type: Number, required: false, default: 0 },
    featured: { type: Boolean, required: true, default: true },
    banner: { type: String, required: false },
    imageurl: { type: String, required: false },
    description: { type: String, required: false },
    samsung: { type: ImageSchema, required: true },
    toshiba: { type: ImageSchema, required: true },
    midea: { type: ImageSchema, required: true },
    nasco: { type: ImageSchema, required: true },
    abb: { type: ImageSchema, required: true },
    philips: { type: ImageSchema, required: true },
    kodak: { type: ImageSchema, required: true },
    sollatek: { type: ImageSchema, required: true },
    status: { type: Boolean, required: true, default: true },
    has_sub: { type: Boolean, required: true, default: true },
    categoryid: { type: [Schema.Types.ObjectId], required: false },
    productid: { type: [Schema.Types.ObjectId], ref: 'product', required: false },
    meta_title: { type: String, required: false, default: 'title' },
    meta_keywords: { type: String, required: false, default: 'keyword' },
    meta_description: { type: String, minlength: 10, required: false, default: 'description' },
    userid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    updated: { type: Date, index: true, default: Date.now }
});

CategorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('category', CategorySchema);