const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//middleware to add data to the body of the request
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
