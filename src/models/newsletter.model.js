const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const DiscountSchema = mongoose.Schema({
    from: { type: String, required: false },
    to: { type: [String], required: false },
    bcc: { type: String, required: false },
    subject: { type: String, required: true },
    body: { type: Number, required: false },
    draft: { type: Boolean, required: true, default: false },
    status: { type: Boolean, required: true, default: false },
    userid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    updated: { type: Date, index: true, default: Date.now }
});

module.exports = mongoose.model('discount', DiscountSchema);