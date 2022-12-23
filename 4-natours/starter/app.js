const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 8001;

app.use(morgan('dev'));

//middleware to add data to the body of the request
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// route handlers



// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

// routes
app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);
//server
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
