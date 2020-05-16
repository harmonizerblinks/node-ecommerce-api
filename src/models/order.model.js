const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const OrderSchema = mongoose.Schema({
    orderno: { type: String, required: true, index: true, unique: true },
    customerid: { type: String, required: true },
    muserid: { type: Schema.Types.ObjectId, ref: 'customers', required: false },
    lastname: { type: String, required: true },
    email: { type: String, index: true, required: true, unique: true },
    mobile: { type: String, index: true, required: true, unique: true },
    address: { type: Object, required: false },
    products: { type: Array, required: false },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'users', required: false },
    updated: { type: Date, index: true, default: Date.now }
});

OrderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('order', OrderSchema);

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