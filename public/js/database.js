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
        radius: 0,
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
        radius: 0,
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
        radius: 0,
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

const dbFetch = () => {
  fetch('/dbData').then((res) => {
    res.json().then((data) => {
      /* Table Update */
      const tableData = [];
      data.forEach((element) => {
        tableData.push(element.btc, element.eth, element.bch);
      });
      table.addData(tableData, true).catch(e => console.log(e));

      /* BTC Chart Update */
      data.forEach((element) => {
        btcConfig.data.labels.push('');
        btcConfig.data.datasets[0].data.push(element.btc.price);
        btcChart.update();
      });

      /* ETH Chart Update */
      data.forEach((element) => {
        ethConfig.data.labels.push('');
        ethConfig.data.datasets[0].data.push(element.eth.price);
        ethChart.update();
      });

      /* BCH Chart Update */
      data.forEach((element) => {
        bchConfig.data.labels.push('');
        bchConfig.data.datasets[0].data.push(element.bch.price);
        bchChart.update();
      });
    }).catch((e) => {
      $errorMessage.textContent = e;
    });
  });
};

/* EVENT LISTENERS */

$once.addEventListener('click', (e) => {
  e.preventDefault();
  dbFetch();
});
