const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountModel = new Schema({
    // _id: false,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // account.user: user._id
    },
    username: {
        type: String,
        required: true,
        // unique: true,
    },
    balances: [
        {
            _id: false,
            // <WallletItem code="BTC" name="Bitcoin" balance="12.2" price="25412.24" address="1Fjp7dRSMpKDyDEDk8pAmL4SSQwtNhybzR" />
            code: {
                type: String,
                required: true,
                // unique: true
            },
            // address: {
            //     type: String,
            //     required: true,
            //     // unique: true
            // },
            balance: {
                type: Number,
                required: true 
            },
            // price: { 
            //     type: Number,
            //     // required: true 
            // }
        }
    ],
    withdraw: [
        {
            code: {
                type: String,
                // required: true,
            },
            fromAddress: {
                type: String,
                // required: true,
            },
            toAddress: {
                type: String,
                // required: true,
            },
            amount: {
                type: Number, 
                // required: true
            },
        }
    ]
});

module.exports = mongoose.model('account', accountModel);