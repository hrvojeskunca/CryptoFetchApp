const request = require('request');

const apiCall = (url, callback) => {
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to api!');
    } else if (body.error) {
      callback('Unable to fetch data!');
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = {
  apiCall,
};
