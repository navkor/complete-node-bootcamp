const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.error(
    'Uncaught exception 💥.  Shutting down the server',
    `Error name: ${err.name}`,
    `Error message: ${err.message}`,
    `Error: ${err}`
  );
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// what if DB is down

mongoose.set('strictQuery', false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'));

const port = process.env.PORT || 8001;
//server
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

// we're going to handle the unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(
    'Unhandled promise rejection 💥. Shutting down the server.',
    err,
    `Error name: ${err.name}`,
    `Error message: ${err.message}`
  );
  server.close(() => {
    process.exit(1);
  });
});
