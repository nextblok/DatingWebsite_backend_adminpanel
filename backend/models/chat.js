const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    receiver: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('chat', schema);