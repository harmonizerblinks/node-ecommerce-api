const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const RoleSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'users', required: false },
    updated: { type: Date, index: true, default: Date.now }
});


module.exports = mongoose.model('role', RoleSchema);