const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  fullName: { type: String },
  age: { type: Number },
  gender: {
    type: String,
    enum: ['male', 'female', 'transgender'],
  },
  bio: { type: String },
  preference: { type: Object },

  role: { type: String, required: true, default: 'user' },
  profilePhoto: {
    type: String,
    default: function () {
      return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`;
    }
  },
  blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
}, { timestamps: true });

userModel.set('toJSON', { getters: true });
userModel.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userModel);
