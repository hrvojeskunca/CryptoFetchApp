const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/FetchApi', {
  useNewUrlParser: true,
  useCreateIndex: true,
}).catch((e) => {
  console.log(e.message);
  return ({ error: 'Database connection failed!' });
});
