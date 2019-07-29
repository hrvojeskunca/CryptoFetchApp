const express = require('express');
const Data = require('../models/data');
const { apiCall } = require('../utils/apiCall');
const { jsonToFetch } = require('../models/jsonToFetch');
const { dataToModel } = require('../models/dataToModel');

const router = express.Router();

const cryptoCompareToken = process.env.CRYPTOCOMPARE_TOKEN;

const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BCH&tsyms=EUR&e=Coinbase&api_key=${cryptoCompareToken}`;

router.get('/apiData', async (req, res) => {
  try {
    await apiCall(url, async (err, apiData) => {
      if (err) {
        return res.send({ error: err });
      }

      try {
        const data = await new Data(dataToModel(apiData));
        await data.save();
        const directData = await jsonToFetch(apiData);
        res.send(directData);
      } catch (e) {
        res.send({ error: e });
      }
    });
  } catch (e) {
    res.send({ error: e });
  }
});

router.get('/dbData', async (req, res) => {
  try {
    const dbData = await Data.find({});
    res.send(dbData);
  } catch (e) {
    res.send({ error: e });
  }
});

module.exports = router;
