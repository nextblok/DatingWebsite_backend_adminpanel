const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    opponent: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('official', schema);