const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const SliderSchema = mongoose.Schema({
    name: { type: String, required: true },
    tabindex: { type: Number, required: true },
    tabtitle: { type: String, required: true },
    imageurl: { type: String, required: true },
    description: { type: String, minlength: 18, required: true },
    link: { type: String, required: true },
    created: { type: Date, index: true, default: Date.now },
    muserid: { type: Schema.Types.ObjectId, ref: 'users', required: false },
    updated: { type: Date, index: true, default: Date.now }
});

module.exports = mongoose.model('slider', SliderSchema);