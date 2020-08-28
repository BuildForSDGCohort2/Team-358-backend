const mongoose = require('mongoose');
const {dbURI} = require('./config');

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

module.exports = connection;
  