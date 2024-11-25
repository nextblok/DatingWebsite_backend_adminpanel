const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    values: {
        type: [String],
        required: true
    },
    weight: {
        type: Number
    },
}, { timestamps: true });

module.exports = mongoose.model('feature', schema);