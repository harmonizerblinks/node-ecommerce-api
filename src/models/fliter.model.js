const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const RoleSchema = mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    categoryid: { type: [Schema.Types.ObjectId], ref: 'category', index: true, required: true },
    status: { type: Boolean, required: true, default: true },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    updated: { type: Date, index: true, default: Date.now }
});


module.exports = mongoose.model('fliter', RoleSchema);