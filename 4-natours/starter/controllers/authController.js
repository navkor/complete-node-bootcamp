const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // this is just for testing purposes. in real applications, do not log in when registering an account!!
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) check if email and passwords actually exist
  if (!email || !password) {
    return next(new AppError('Please provide a valid email and password', 400));
  }

  // 2) check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  // 3) if everything is ok, send a token
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  const token = signToken(user._id);

  res.status(201).json({
    status: 'success',
    token,
  });
});
