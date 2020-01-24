const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    fullname: { type: String, minlength: 8, maxlength: 50, required: true },
    username: { type: String, minlength: 8, maxlength: 15, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, index: true, required: true, unique: true },
    email_comfirmed: { type: Boolean, required: true, default: false },
    mobile: { type: String, minlength: 8, maxlength: 15, required: true, unique: true },
    mobile_comfirmed: { type: Boolean, required: true, default: false },
    email: { type: String, required: true, unique: true },
    usertype: { type: String, required: true },
    roles: { type: [String], required: true },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'users', required: false },
    updated: { type: Date, index: true, default: Date.now }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', UserSchema);