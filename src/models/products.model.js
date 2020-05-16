const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ProductSizesSchema = mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    imageurl: { type: String, required: false },
    amount: { type: String, required: true, default: 0 },
    link: { type: String, required: false, default: 'https://electrolandgh.com' },
    default: { type: Boolean, required: false, default: false },
    status: { type: Boolean, required: true, default: true },
    created: { type: Date, index: true, default: Date.now },
    updated: { type: Date, index: true, default: Date.now }
});

const ProductColorsSchema = mongoose.Schema({
    name: { type: String, required: true },
    imageurl: { type: String, required: false },
    amount: { type: String, required: true, default: 0 },
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
    name: { type: String, required: true },
    icon: { type: String, required: false },
    imageurl: { type: String, required: true },
    description: { type: String, required: true, default: 'the is a default Featured Description' },
    featured: { type: Boolean, required: true, default: false },
    created: { type: Date, index: true, default: Date.now },
});

const ProductCategorySchema = mongoose.Schema({
    name: { type: String, required: true },
    imageurl: { type: String, required: true },
    description: String,
    created: { type: Date, index: true, default: Date.now }
});

const ProductSpecSchema = mongoose.Schema({
    name: { type: String, required: true },
    details: { type: String, required: true },
    created: { type: Date, index: true, default: Date.now }
});

const ProductSchema = mongoose.Schema({
    code: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true, index: true },
    featured: { type: Boolean, required: true, default: true },
    package: { type: Boolean, required: true, default: false },
    imageurl: { type: String, required: true, default: 'https://images.samsung.com/is/image/samsung/africa-en-qled-q900r-row-qa65q900rbkxxa-frontblack-159744995?$PD_GALLERY_L_JPG$' },
    banner: { type: String, required: false },
    promotion_image: { type: String, required: false },
    images: { type: [ProductImagesSchema], required: false },
    categoryid: { type: [Schema.Types.ObjectId], ref: 'category', index: true, required: true },
    //categoryids: { type: [Schema.Types.ObjectId], ref: 'category', required: true },
    // category: { type: [ProductCategorySchema], required: false },
    brandid: { type: Schema.Types.ObjectId, ref: 'brand', required: false },
    productid: { type: [Schema.Types.ObjectId], ref: 'product', required: false, default: [] },
    // brand: { type: ProductBrandSchema, required: false },
    short_description: { type: String, required: false, index: true, default: '' },
    description: { type: String, required: false, default: '' },
    additional_attributes: { type: String },
    attribute_set_code: { type: String },
    original_amount: { type: String, required: true, default: 0 },
    current_amount: { type: String, required: true, default: 0 },
    amount: { type: String, required: true, default: 0 },
    weight: { type: String, required: false },
    sizes: { type: [ProductSizesSchema], required: false },
    specs: { type: [ProductSpecSchema], required: false },
    colors: { type: [ProductColorsSchema], required: false },
    features: { type: [ProductFeaturesSchema], required: false },
    link: { type: String, required: true, default: 'https://electrolandgh.com' },
    status: { type: Boolean, required: true, default: true },
    discount: { type: Boolean, required: true, default: false },
    quantity: { type: Number, min: 0, max: 100000, required: true, default: 0 },
    min_cart_qty: { type: Number, min: 0, max: 10000, required: true, default: 1 },
    meta_title: { type: String, required: false },
    meta_keywords: { type: String, required: false },
    meta_description: { type: String, minlength: 10, required: false },
    userid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    updated: { type: Date, index: true, default: Date.now }
});


module.exports = mongoose.model('product', ProductSchema);