const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
    console.log(`Tour id is ${val}`);
  const id = req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'No such tour',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
    const { name, price } = req.body;
    if (!name ||!price) {
        return res.status(400).json({
            status: 'failed',
            message: 'Both name and price are required',
        });
    }
    next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: tours,
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

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
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
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
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
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
};
