const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema(
    {
        user_id: {
            type: String,
            required: true
        },
        pair: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        buysell: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        coin_amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
        },
        time:{
            type: Date
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('orders', mySchema);