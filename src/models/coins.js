const btc = jsonData => ({
  btc: {
    name: `${jsonData.DISPLAY.BTC.EUR.FROMSYMBOL} ${jsonData.RAW.BTC.EUR.FROMSYMBOL}`,
    market: jsonData.RAW.BTC.EUR.MARKET,
    price: jsonData.RAW.BTC.EUR.PRICE,
    openDay: jsonData.RAW.BTC.EUR.OPENDAY,
    highDay: jsonData.RAW.BTC.EUR.HIGHDAY,
    lowDay: jsonData.RAW.BTC.EUR.LOWDAY,
    marketCap: jsonData.DISPLAY.BTC.EUR.MKTCAP,
    time: new Date(jsonData.RAW.BTC.EUR.LASTUPDATE * 1000).toLocaleTimeString('hr-HR'),
  },
});

const eth = jsonData => ({
  eth: {
    name: `${jsonData.DISPLAY.ETH.EUR.FROMSYMBOL} ${jsonData.RAW.ETH.EUR.FROMSYMBOL}`,
    market: jsonData.RAW.ETH.EUR.MARKET,
    price: jsonData.RAW.ETH.EUR.PRICE,
    openDay: jsonData.RAW.ETH.EUR.OPENDAY,
    highDay: jsonData.RAW.ETH.EUR.HIGHDAY,
    lowDay: jsonData.RAW.ETH.EUR.LOWDAY,
    marketCap: jsonData.DISPLAY.ETH.EUR.MKTCAP,
    time: new Date(jsonData.RAW.ETH.EUR.LASTUPDATE * 1000).toLocaleTimeString('hr-HR'),
  },
});

const bch = jsonData => ({
  bch: {
    name: `${jsonData.DISPLAY.BCH.EUR.FROMSYMBOL} ${jsonData.RAW.BCH.EUR.FROMSYMBOL}`,
    market: jsonData.RAW.BCH.EUR.MARKET,
    price: jsonData.RAW.BCH.EUR.PRICE,
    openDay: jsonData.RAW.BCH.EUR.OPENDAY,
    highDay: jsonData.RAW.BCH.EUR.HIGHDAY,
    lowDay: jsonData.RAW.BCH.EUR.LOWDAY,
    marketCap: jsonData.DISPLAY.BCH.EUR.MKTCAP,
    time: new Date(jsonData.RAW.BCH.EUR.LASTUPDATE * 1000).toLocaleTimeString('hr-HR'),
  },
});

module.exports = {
  btc,
  eth,
  bch,
};
