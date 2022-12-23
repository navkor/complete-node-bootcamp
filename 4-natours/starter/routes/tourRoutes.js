const express = require('express');
const fs = require('fs');
const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: tours,
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    res.status(404).json({
      status: 'failed',
      message: 'No such tour',
    });
  } else {
    const tour = tours.find((el) => el.id === id);
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
  }
};

const createTour = (req, res) => {
  // adding a new tour to the database
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        console.log(err);
      }
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length) {
    res.status(404).json({
      status: 'failed',
      message: 'No such tour',
    });
  } else {
    const tour = tours.find((el) => el.id === id);
    if (tour) {
      res.status(200).json({
        status: 'success',
        data: { tour: '<Updated tour here>' },
      });
    } else {
      res.status(404).json({
        status: 'failure',
        message: 'No such tour',
      });
    }
  }
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length) {
    res.status(404).json({
      status: 'failed',
      message: 'No such tour',
    });
  } else {
    const tour = tours.find((el) => el.id === id);
    if (tour) {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    } else {
      res.status(404).json({
        status: 'failure',
        message: 'No such tour',
      });
    }
  }
};

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;