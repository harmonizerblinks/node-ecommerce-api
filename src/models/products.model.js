const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ProductSizesSchema = mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    imageurl: { type: String, required: false },
    amount: { type: Schema.Types.Decimal128, required: true },
    status: { type: Boolean, required: true },
    created: { type: Date, index: true, default: Date.now },
    updated: { type: Date, index: true, default: Date.now }
});

const ProductColorsSchema = mongoose.Schema({
    name: { type: String, required: true },
    imageurl: { type: String, required: false },
    amount: { type: String, required: true },
    status: { type: Boolean, required: true },
    created: { type: Date, index: true, default: Date.now },
    updated: { type: Date, index: true, default: Date.now }
});

const ProductImagesSchema = mongoose.Schema({
    name: { type: String, required: false },
    imageurl: { type: String, required: true },
    featured: { type: Boolean, required: true, default: false },
    created: { type: Date, index: true, default: Date.now },
});

const ProductFeaturesSchema = mongoose.Schema({
    name: { type: String, required: false },
    imageurl: { type: String, required: true },
    featured: { type: Boolean, required: true, default: false },
    created: { type: Date, index: true, default: Date.now },
});

const ProductCategorySchema = mongoose.Schema({
    name: { type: String, required: true },
    imageurl: { type: String, required: true },
    description: String,
    created: { type: Date, index: true, default: Date.now }
});

const ProductSchema = mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    featured: { type: Boolean, required: true, default: true },
    package: { type: Boolean, required: true, default: true },
    imageurl: { type: String, required: true },
    banner: { type: String, required: false },
    images: { type: [ProductImagesSchema], required: false },
    categoryid: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    //categoryids: { type: [Schema.Types.ObjectId], ref: 'category', required: true },
    category: { type: [ProductCategorySchema], required: false },
    brandid: { type: Schema.Types.ObjectId, ref: 'brand', required: false },
    productid: { type: [Schema.Types.ObjectId], ref: 'product', required: false },
    // brand: { type: ProductBrandSchema, required: false },
    features: { type: [ProductFeaturesSchema], required: true },
    introduction: { type: String, required: false },
    description: { type: String, required: false },
    original_amount: { type: String, required: true, default: 0 },
    current_amount: { type: String, required: true, default: this.amount },
    amount: { type: String, required: true, default: this.current_amount },
    sizes: { type: [ProductSizesSchema], required: false },
    colors: { type: [ProductColorsSchema], required: false },
    link: { type: String, required: true, default: 'https://electrolandgh.com' },
    status: { type: Boolean, required: true, default: true },
    discount: { type: Boolean, required: true, default: false },
    quantity: { type: Number, min: 0, max: 10000, required: true, default: 0 },
    minimum: { type: Number, min: 0, max: 10000, required: true, default: 0 },
    meta_tag: { type: String, required: false },
    meta_keyword: { type: String, required: false },
    meta_description: { type: String, minlength: 10, required: false },
    userid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    updated: { type: Date, index: true, default: Date.now }
});


module.exports = mongoose.model('product', ProductSchema);