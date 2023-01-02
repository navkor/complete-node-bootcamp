//this block replaces the try catch block.  it will return the annonymous function and if there's an error, the catch will then be called after the promise is returned.

module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(err)); // this will take the error into the next handler which sends it to the global error handler
};
