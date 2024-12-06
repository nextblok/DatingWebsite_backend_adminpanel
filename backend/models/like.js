const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    liker: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    likee: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('like', schema);