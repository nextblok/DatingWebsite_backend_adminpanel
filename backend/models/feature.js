const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('feature', schema);