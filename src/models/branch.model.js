const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const BranchSchema = mongoose.Schema({
    name: { type: String, required: true },
    imageurl: { type: String, required: false },
    loc: { type: [String], required: false },
    longitude: { type: String, required: false },
    latitude: { type: String, required: false },
    mapurl: { type: String, required: false },
    mobile: { type: String, required: false },
    email: { type: String, required: false },
    address: { type: String, required: false },
    region: { type: String, required: false },
    city: { type: String, required: false },
    description: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    userid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    updated: { type: Date, index: true, default: Date.now }
});

BranchSchema.plugin(uniqueValidator);

module.exports = mongoose.model('branch', BranchSchema);