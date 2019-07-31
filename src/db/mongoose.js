const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
}).catch((e) => {
  console.log(e.message);
  return ({ error: 'Database connection failed!' });
});
