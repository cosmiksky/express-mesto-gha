const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // name должно быть у каждого пользователя, обязательное поле
    minlength: 2,
    maxlength: 30,
  },

  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    required: true,
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('user', userSchema);
