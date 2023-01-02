const validator = require('validator');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true,
    minlength: [5, 'Please enter a valid name with at least 5 characters'],
  },
  email: {
    type: String,
    required: [true, 'An email is required for this application'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a valid password'],
    minlength: [8, 'please enter a password of at least 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
  photo: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
