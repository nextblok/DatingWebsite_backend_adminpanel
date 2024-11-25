const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const withdrawModel = new Schema({
    user_id: {
        type: String,
    },
    code: {
        type: String,
        required: true
    },
    address: {
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

module.exports = mongoose.model('withdraw', withdrawModel);