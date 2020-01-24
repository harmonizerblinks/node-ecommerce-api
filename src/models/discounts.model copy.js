const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const DiscountSchema = mongoose.Schema({
    name: { type: String, required: true },
    percentage: { type: Number, required: false },
    description: { type: String, required: false },
    productid: { type: [Schema.Types.ObjectId], ref: 'product', required: false },
    status: { type: Boolean, required: true, default: true },
    userid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    updated: { type: Date, index: true, default: Date.now }
});


module.exports = mongoose.model('discount', DiscountSchema);