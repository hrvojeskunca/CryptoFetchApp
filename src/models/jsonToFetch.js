const { btc, eth, bch } = require('./coins');

const jsonToFetch = (jsonData) => {
  const dataArray = [];
  dataArray.push(btc(jsonData), eth(jsonData), bch(jsonData));
  return dataArray;
};

module.exports = {
  jsonToFetch,
};
