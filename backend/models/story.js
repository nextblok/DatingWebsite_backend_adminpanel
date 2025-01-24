const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user1_id: { type: Schema.Types.ObjectId, ref: 'user' },
    user2_id: { type: Schema.Types.ObjectId, ref: 'user' },
    user1_photo: { type: String },
    user2_photo: { type: String },
    user1_name: { type: String },
    user2_name: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('story', schema);