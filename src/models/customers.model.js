const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const CustomerSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, index: true, required: true, unique: true },
    email_comfirmed: { type: Boolean, required: true, default: false },
    mobile: { type: String, minlength: 8, maxlength: 15, required: true, unique: true },
    mobile_comfirmed: { type: Boolean, required: true, default: false },
    password: { type: String, required: false },
    address: { type: Object, required: false },
    wishlist: { type: [String], required: false },
    compare: { type: [String], required: false },
    recently: { type: Array, required: false },
    carts: { type: Array, required: false },
    created: { type: Date, index: true, default: Date.now },
    updated: { type: Date, index: true, default: Date.now }
});

CustomerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('customer', CustomerSchema);

function generateOTP() {
    var digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var otpLength = 8;
    var otp = '';

    for (let i = 1; i <= otpLength; i++) {
        var index = Math.floor(Math.random() * (digits.length));

        otp = otp + digits[index];
    }
    return otp.toUpperCase();
}