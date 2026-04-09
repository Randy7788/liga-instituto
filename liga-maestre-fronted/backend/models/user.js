const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    tipo: {
      type: String,
      enum: ['admin', 'user', 'arbitro'],
      default: 'user'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
