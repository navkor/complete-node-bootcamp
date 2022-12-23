const Tour = require('../models/tourModel');

// exports.checkId = (req, res, next, val) => {
//   console.log(`Tour id is ${val}`);
//   const { id } = req.params.id;
//   if (id > tours.length) {
//     return res.status(404).json({
//       status: 'failed',
//       message: 'No such tour',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   const { name, price } = req.body;
//   if (!name || !price) {
//     return res.status(400).json({
//       status: 'failed',
//       message: 'Both name and price are required',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (tour) {
      res.status(200).json({
        status: 'success',
        data: { tour: tour },
      });
    } else {
      res.status(404).json({
        status: 'failure',
        message: 'No such tour',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'failure',
      message: err.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: 'invalid data sent',
    });
  }

  // adding a new tour to the database
  //console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);

  // tours.push(newTour);
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'failure',
      message: 'invalid request',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'failure',
      message: 'invalid request',
    });
  }
};
