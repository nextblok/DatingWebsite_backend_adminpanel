const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deposit = new Schema({
    user_id: {
        type: String,
    },
    code: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('deposit', deposit);