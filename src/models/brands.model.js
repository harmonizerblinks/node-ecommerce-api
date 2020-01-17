const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const BrandSchema = mongoose.Schema({
    name: { type: String, index: true, required: true, unique: true },
    sort: { type: Number, required: false },
    logo: { type: String, required: true },
    banner: { type: String, required: true },
    imageurl: { type: String, required: false },
    blog_image: { type: String, required: false },
    promotion_image: { type: String, required: false },
    promotion: { type: Boolean, required: false },
    description: { type: String, minlength: 10, required: false },
    promotions: { type: [Schema.Types.ObjectId], ref: 'product', required: false },
    categoryid: { type: [Schema.Types.ObjectId], ref: 'category', required: false },
    categorys: { type: Array },
    meta_tag: { type: String, required: false },
    meta_keyword: { type: String, required: false },
    meta_description: { type: String, minlength: 10, required: false },
    status: { type: Boolean, required: true, default: true },
    userid: { type: Schema.Types.ObjectId, ref: 'users', required: false },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'users', required: false },
    updated: { type: Date, index: true, default: Date.now }
});


BrandSchema.plugin(uniqueValidator);

module.exports = mongoose.model('brand', BrandSchema);