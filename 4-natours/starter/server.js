const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');



const port = process.env.PORT || 8001;
//server
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
