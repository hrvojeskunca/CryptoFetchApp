const $start = document.querySelector('#start');
const $stop = document.querySelector('#stop');
const $once = document.querySelector('#once');
const $downloadCsv = document.querySelector('#download-csv');
const $errorMessage = document.querySelector('#errorMessage');

/* TABLE */

const table = new Tabulator('#example-table', {
  height: 330,
  layout: 'fitColumns',
  responsiveLayout: 'hide',
  tooltips: true,
  pagination: 'local',
  paginationSize: 10,
  paginationSizeSelector: [3, 5, 8, 10],
  movableColumns: true,
  resizableRows: true,
  columns: [
    {
      title: 'Name', field: 'name', headerFilter: 'input', align: 'center',
    },
    {
      title: 'Market', field: 'market', headerFilter: 'input', align: 'center',
    },
    {
      title: 'Price', field: 'price', headerFilter: 'number', headerFilterPlaceholder: 'At least...', headerFilterFunc: '>=', align: 'center', formatter(cell, formatterParams, onRendered) { return `€ ${cell.getValue()}`; },
    },
    {
      title: 'Open Day Price', field: 'openDay', headerFilter: 'number', headerFilterPlaceholder: 'At least...', headerFilterFunc: '>=', align: 'center', formatter(cell, formatterParams, onRendered) { return `€ ${cell.getValue()}`; },
    },
    {
      title: 'Highest Price - Daily', field: 'highDay', headerFilter: 'number', headerFilterPlaceholder: 'Greater than...', headerFilterFunc: '>=', align: 'center', formatter(cell, formatterParams, onRendered) { return `€ ${cell.getValue()}`; },
    },
    {
      title: 'Lowest Price - Daily', field: 'lowDay', headerFilter: 'number', headerFilterPlaceholder: 'Lesser than...', headerFilterFunc: '<=', align: 'center', formatter(cell, formatterParams, onRendered) { return `€ ${cell.getValue()}`; },
    },
    {
      title: 'Market Cap', field: 'marketCap', align: 'center',
    },
    {
      title: 'Last Update', field: 'time', sorter: 'time', sorterParams: { format: 'hh:mm:ss', alignEmptyValues: 'top' }, align: 'center',
    },
  ],
});

$downloadCsv.addEventListener('click', () => table.download('csv', 'data.csv'));

/* CHART */

const btcConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Bitcoin - Price',
      data: [],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132)',
    }],
  },
  options: {
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          callback(value, index, values) {
            return `€ ${value}`;
          },
        },
      }],
      xAxes: [{
        gridLines: true,
      }],
    },
  },
};

const ethConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Ethereum - Price',
      data: [],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235)',
    }],
  },
  options: {
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          callback(value, index, values) {
            return `€ ${value}`;
          },
        },
      }],
      xAxes: [{
        gridLines: true,
      }],
    },
  },
};

const bchConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'BitcoinCash - Price',
      data: [],
      fill: true,
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255)',
    }],
  },
  options: {
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          callback(value, index, values) {
            return `€ ${value}`;
          },
        },
      }],
      xAxes: [{
        gridLines: true,
      }],
    },
  },
};


const btc = document.getElementById('btc').getContext('2d');
const btcChart = new Chart(btc, btcConfig);

const eth = document.getElementById('eth').getContext('2d');
const ethChart = new Chart(eth, ethConfig);

const bch = document.getElementById('bch').getContext('2d');
const bchChart = new Chart(bch, bchConfig);

/* FETCH */

const fetchData = () => {
  fetch('/apiData').then((res) => {
    res.json().then((data) => {
      /* Table Update */
      const tableData = [];
      tableData.push(data[0].btc, data[1].eth, data[2].bch);
      table.addData(tableData, true).catch(e => console.log(e));

      /* BTC Chart Update */
      btcConfig.data.labels.push('');
      btcConfig.data.datasets[0].data.push(data[0].btc.price);
      btcChart.update();

      /* ETH Chart Update */
      ethConfig.data.labels.push('');
      ethConfig.data.datasets[0].data.push(data[1].eth.price);
      ethChart.update();

      /* BCH Chart Update */
      bchConfig.data.labels.push('');
      bchConfig.data.datasets[0].data.push(data[2].bch.price);
      bchChart.update();
    });
  }).catch((e) => {
    $errorMessage.textContent = e;
  });
};

/* EVENT LISTENERS */

$once.addEventListener('click', (e) => {
  e.preventDefault();
  fetchData();
});

let interval;

$start.addEventListener('click', (e) => {
  e.preventDefault();

  interval = setInterval(fetchData, 2000);

  setTimeout(() => { clearInterval(interval); console.log('Stopped Fetching!'); }, 3600000);
});

$stop.addEventListener('click', () => {
  console.log('Forced Stop!');
  clearInterval(interval);
});
